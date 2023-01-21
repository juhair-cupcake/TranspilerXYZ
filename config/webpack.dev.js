const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const fs = require('fs')
const { merge } = require('webpack-merge');
//const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'shared'
    }
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    host: 'localhost',
    liveReload: false,
    open: true,
    compress: true,
    hot: false,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    }
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: '[id].css'
    })
  ]
});
