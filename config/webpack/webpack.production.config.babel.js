const path = require('path')
const Webpack = require('webpack')
const WebpackChunkHash = require('webpack-chunk-hash')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const Config = require('webpack-config').default
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = new Config().extend('config/webpack/webpack.base.config.babel.js').merge({
  entry: [
    './src/index',
  ],
  output: {
    path: path.resolve('./public'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ],
        }),
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      API_URL: JSON.stringify(''),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
    new WebpackChunkHash(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.resource && module.resource.indexOf(path.resolve('node_modules')) === 0,
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      chunks: ['vendor'],
      minChunks: Infinity,
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new ExtractTextPlugin({
      filename: 'bundle.[contenthash].css',
      allChunks: true,
    }),
  ],
})
