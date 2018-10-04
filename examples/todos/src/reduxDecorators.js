/*
 * REDUX DECORATORS - ALPHA FILE JUST FOR DEVELOPMENT, WILL USE MODULE
 */

import { connect } from 'react-redux';

const STATE = '__autoStateBuffer';
const DISPATCH = '__autoDispatchBuffer';

export function Autoconnect(optionalMergePropFunction, optionalOptions) {
  return (target, name, descriptor) => {
    const globalSelf       = _getGlobalScope();
    const globalState      = globalSelf[STATE];
    const globalDispatch   = globalSelf[DISPATCH];

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
    globalSelf[STATE] = null;
    globalSelf[DISPATCH] = null;

    return connect(mapStateToProps, mapDispatchToProps, mergeProps, optionalOptions)(target);
  }
}

/*
 * Decorator for auto state
 * - If optionalPathFn is not specified, the name of the decorated prop will be used as the key to extract from the state
 * - IF optionalPathFn IS specified, it will be called and the returned result used as the value
 * If you need access to ownProps, see StateWithProps (_includeOwnProps is private here)
 */
export function State(optionalPathFn, _includeOwnProps) {
  return (target, name) => {
    const globalSelf = _getGlobalScope();
    const globalState = (globalSelf[STATE] || (globalSelf[STATE] = []));

    globalState.push((state, ownProps) => ({
      [name]: optionalPathFn
                ? (_includeOwnProps ? optionalPathFn(ownProps, state) : optionalPathFn(state))
                : state[name]
    }));
  }
}

/*
 * Same as State but the first argument passed to pathFn will be ownProps
 */
export function StateWithProps(pathFn) {
  return State(pathFn, true);
}

/*
 * Decorator for auto dispatching action functions
 * If you need access to ownProps, see DispatchWithProps (_includeOwnProps is private here)
 */
export function Dispatch(actionFn, _includeOwnProps) {
  return (target, name) => {
    const globalSelf = _getGlobalScope();
    const globalDispatch = (globalSelf[DISPATCH] || (globalSelf[DISPATCH] = []));

    globalDispatch.push((dispatch, ownProps) => ({
      [name]: function(/* arguments */) {
        return dispatch( _includeOwnProps ? actionFn(ownProps, ...arguments) : actionFn(...arguments) );
      }
    }));
  }
}

/*
 * Same as Dispatch but the first argument passed to actionFn will be ownProps
 */
export function DispatchWithProps(actionFn) {
  return Dispatch(actionFn, true);
}

function _getGlobalScope() {
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;

  //eslint-disable-next-line
  if (typeof self !== 'undefined') return self;
}
