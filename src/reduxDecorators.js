import { autoConnect } from 'react-redux-autoconnect';
autoConnect(null, null);
const STATE = '__autoStateBuffer';
const DISPATCH = '__autoDispatchBuffer';
export function autoconnect(optionalMergePropFunction, optionalOptions) {
  return (target, name, descriptor) => {
    const self = _getGlobalScope();

    const globalState = self[STATE];
    const globalDispatch = self[DISPATCH];

    if (globalState) {
      target.mapStateToProps = (state, ownProps) => {
        let props = globalState.map(fn => fn(state, ownProps));  // An Array of objects, all that have one key-value
        return Object.assign.apply(null, props); // Merges the array of objects into one object
      }
    }

    if (globalDispatch) {
      target.mapDispatchToProps = (dispatch, ownProps) => {
        let props = globalDispatch.map(fn => fn(dispatch, ownProps));  // An Array of objects, all that have one key-value
        return Object.assign.apply(null, props); // Merges the array of objects into one object
      }
    }

    target.mergeProps = optionalMergePropFunction;

    // Clear the global holders for the next class' annotations
    self[STATE] = null;
    self[DISPATCH] = null;

    return autoConnect(target, optionalOptions);
  }
}

export function state(optionalPathFn) {
  return (target, name) => {
    const self = _getGlobalScope();
    const globalState = (self[STATE] || (self[STATE] = []));

    globalState.push((state, ownProps) => ({
      [name]: optionalPathFn ? optionalPathFn(state, ownProps) : state[name]
    }));
  }
}

export function dispatch(actionFn, includeOwnProps = false) {
  return (target, name) => {
    const self = _getGlobalScope();
    const globalDispatch = (self[DISPATCH] || (self[DISPATCH] = []));

    globalDispatch.push((dispatch, props) => ({
      [name]: function(/* arguments */) {
        return dispatch( includeOwnProps ? actionFn(props, ...arguments) : actionFn(...arguments) );
      }
    }));
  }
}

function _getGlobalScope() {
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined')   return self;
}