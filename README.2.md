# react-redux-autoconnect-decorators

Decorators to simplify [react-redux](https://github.com/reactjs/react-redux)'s `connect()`

Inspired by [react-redux-autoconnect](https://www.npmjs.com/package/react-redux-autoconnect) by Robert Sargant (simple != stupid ;) )

[![Travis](https://img.shields.io/travis/sargant/react-redux-autoconnect.svg?style=flat-square)](https://travis-ci.org/sargant/react-redux-autoconnect)
[![npm](https://img.shields.io/npm/v/react-redux-autoconnect.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-autoconnect)

## Using decorators with create-react-app
If you are using create-react-app and don't want to eject to add decorators, you can use: https://github.com/timarney/react-app-rewired

(Note: create-react-app may support decorators one day. [Check here to see if they came to their senses](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators))

1) Follow the instructions for react-app-rewired

2) Add decorator support into your code base:
```
npm install --save-dev babel-plugin-transform-decorators-legacy
```

3) Update `config-overrides.js` to:
```
/* config-overrides.js */
const {injectBabelPlugin} = require('react-app-rewired');
const DECORATORS_PLUGIN_NAME = 'babel-plugin-transform-decorators-legacy';

module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin([DECORATORS_PLUGIN_NAME], config);

  return config;
};

```


## Usage

```javascript
autoConnect(Component, [options])
```

Like `connect()`, but looks for static methods called `mapStateToProps`,
`mapDispatchToProps`, and `mergeProps` on the passed `Component`, instead of
passing them manually.

For how to use `mapStateToProps`, `mapDispatchToProps`, and `mergeProps`, read
the [react-redux documentation](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

The optional `options` argument is also passed to `connect()` as the fourth argument.

## Why?

So you can now keep everything wrapped up in a single class:

```javascript
import autoConnect from 'react-redux-autoconnect'

class Foo extends React.Compoment {
  render () {
    return (
      <div>Hello {this.props.name}!</div>
    )
  }

  static mapStateToProps = (state) => ({
    name: state.name
  })
}

export default autoConnect(Foo)
```

## This is stupidly simple code and you should be ashamed

I know, but I was fed up of writing the same utility function over and over.


## Compatibility

This should work with any version of react-redux, from 0.1.0 up to 5.1.0
and probably beyond unless react-redux significantly changes their API.
