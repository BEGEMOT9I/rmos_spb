const Config = require('webpack-config').default;

module.exports = new Config().extend('config/webpack/webpack.[NODE_ENV].config.babel.js')
