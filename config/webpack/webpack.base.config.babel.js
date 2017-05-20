const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Config = require('webpack-config').default
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = new Config().merge({
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    alias: {
      'src': path.resolve('./src'),
      'static': path.resolve('./src/assets'),
      'images': path.resolve('./src/assets/images'),
      'video': path.resolve('./src/assets/video'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve('./src')
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/images/[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.mp4$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/video/[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash].[ext]',
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\/sprite\/[\w\-]*\.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: {
            name: 'static/images/[name]',
            prefixize: true,
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/sprite/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/images/[name].[hash].[ext]',
            mimetype: 'image/svg+xml',
          },
        },
      },
      {
        test: /\.obj$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name].[hash].[ext]',
          },
        },
      },
      {
        test: require.resolve('snapsvg'),
        use: {
          loader: 'imports-loader?this=>window,fix=>module.exports=0'
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html.ejs', hash: true }),
  ],
})
