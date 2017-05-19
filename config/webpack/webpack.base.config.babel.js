const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Config = require('webpack-config').default
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = new Config().merge({
  entry: [
    './src/index',
  ],
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [path.resolve('./src')],
    alias: {
      'src': path.resolve('./src'),
      'static': path.resolve('./src/assets'),
      'images': path.resolve('./src/assets/images'),
      'video': path.resolve('./src/assets/video'),
    },
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: path.resolve('./src'), },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass!autoprefixer') },
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style', 'css!autoprefixer') },
      { test: /\.(png|jpg)$/, loader: 'file?name=images/[name].[hash].[ext]' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff'},
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff'},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream'},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]'},
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]'},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=images/[name].[hash].[ext]&mimetype=image/svg+xml' },
      { test: require.resolve('snapsvg'), loader: 'imports-loader?this=>window,fix=>module.exports=0' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html.ejs', }),
    new ExtractTextPlugin("bundle.css"),
  ],
})
