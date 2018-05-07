import { connect } from 'react-redux';

const STATE = '__autoStateBuffer';
const DISPATCH = '__autoDispatchBuffer';

export function autoconnect(optionalMergePropFunction, optionalOptions) {
  return (target, name, descriptor) => {
    const self = _getGlobalScope();

    const globalState      = self[STATE];
    const globalDispatch   = self[DISPATCH];

    let mapStateToProps    = null;
    let mapDispatchToProps = null;
    let mergeProps         = optionalMergePropFunction || null;

    if (globalState) {
      mapStateToProps = (state, ownProps) => {
        let props = globalState.map(fn => fn(state, ownProps));  // An Array of objects, all that have one key-value
        return Object.assign.apply(null, props); // Merges the array of objects into one object
      }
    }

    if (globalDispatch) {
      mapDispatchToProps = (dispatch, ownProps) => {
        let props = globalDispatch.map(fn => fn(dispatch, ownProps));  // An Array of objects, all that have one key-value
        return Object.assign.apply(null, props); // Merges the array of objects into one object
      }
    }

    // Clear the global holders for the next class' annotations
    self[STATE] = null;
    self[DISPATCH] = null;

    return connect(mapStateToProps, mapDispatchToProps, mergeProps, optionalOptions)(target);
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