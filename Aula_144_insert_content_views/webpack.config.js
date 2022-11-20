const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin();

module.exports = {
  mode: 'production', 
  entry: './frontend/index.js', 
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'), 
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader', 
        {
        loader: 'css-loader',
        // options: {
        //   url: true,
        //   }
        }
      ]
    },
    {
      test: /\.(gif|png|jpe?g|svg|xml|json)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: path.resolve(__dirname, 'public', 'assets', 'images'),
          }
        },
      ],
     type: 'javascript/auto'
    },
    ],
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i,
    })],
  },
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "assert": false,
    },
  },
  target: 'node',
  plugins: [assetsPluginInstance]
}