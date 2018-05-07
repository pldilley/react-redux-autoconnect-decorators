'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoconnect = autoconnect;
exports.state = state;
exports.dispatch = dispatch;

var _reactReduxAutoconnect = require('react-redux-autoconnect');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STATE = '__autoStateBuffer';
var DISPATCH = '__autoDispatchBuffer';
function autoconnect(optionalMergePropFunction, optionalOptions) {
  return function (target, name, descriptor) {
    var self = _getGlobalScope();

    var globalState = self[STATE];
    var globalDispatch = self[DISPATCH];

    if (globalState) {
      target.mapStateToProps = function (state, ownProps) {
        var props = globalState.map(function (fn) {
          return fn(state, ownProps);
        }); // An Array of objects, all that have one key-value
        return Object.assign.apply(null, props); // Merges the array of objects into one object
      };
    }

    if (globalDispatch) {
      target.mapDispatchToProps = function (dispatch, ownProps) {
        var props = globalDispatch.map(function (fn) {
          return fn(dispatch, ownProps);
        }); // An Array of objects, all that have one key-value
        return Object.assign.apply(null, props); // Merges the array of objects into one object
      };
    }

    target.mergeProps = optionalMergePropFunction;

    // Clear the global holders for the next class' annotations
    self[STATE] = null;
    self[DISPATCH] = null;

    return (0, _reactReduxAutoconnect.autoConnect)(target, optionalOptions);
  };
}

function state(optionalPathFn) {
  return function (target, name) {
    var self = _getGlobalScope();
    var globalState = self[STATE] || (self[STATE] = []);

    globalState.push(function (state, ownProps) {
      return _defineProperty({}, name, optionalPathFn ? optionalPathFn(state, ownProps) : state[name]);
    });
  };
}

function dispatch(actionFn) {
  var includeOwnProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function (target, name) {
    var self = _getGlobalScope();
    var globalDispatch = self[DISPATCH] || (self[DISPATCH] = []);

    globalDispatch.push(function (dispatch, props) {
      return _defineProperty({}, name, function () /* arguments */{
        return dispatch(includeOwnProps ? actionFn.apply(undefined, [props].concat(Array.prototype.slice.call(arguments))) : actionFn.apply(undefined, arguments));
      });
    });
  };
}

function _getGlobalScope() {
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;
}