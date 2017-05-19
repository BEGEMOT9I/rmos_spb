const path = require('path')
const Webpack = require('webpack')
const Config = require('webpack-config').default

module.exports = new Config().extend('config/webpack/webpack.base.config.babel.js').merge({
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new Webpack.DefinePlugin({
      'API_URL': JSON.stringify('http://0.0.0.0:8000'),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devtool: 'source-map',
})
