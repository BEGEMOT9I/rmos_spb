const path = require('path')
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Config = require('webpack-config').default

module.exports = new Config().extend('config/webpack/webpack.base.config.babel.js').merge({
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
  },
  plugins: [

    new Webpack.DefinePlugin({
      // 'API_URL': JSON.stringify('http://b-haus.ru'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  ],
})
