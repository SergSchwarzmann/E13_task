const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// webpack.production.config.js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js'
    },
    plugins: [ new MiniCssExtractPlugin(),
               new HtmlWebpackPlugin({template: './src/index.pug'}),
               new TerserWebpackPlugin(),
               new CssMinimizerPlugin(),
               new ESLintPlugin(),
               new StyleLintPlugin(),
              ],
    module: {
      rules: [
      {
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          }
        }, 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
    ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin(),
      ],
    }
  };