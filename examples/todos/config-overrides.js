/* config-overrides.js */
const {injectBabelPlugin} = require('react-app-rewired');
const DECORATORS_PLUGIN_NAME = 'babel-plugin-transform-decorators-legacy';

module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin([DECORATORS_PLUGIN_NAME], config);

  return config;
};
