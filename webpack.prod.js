const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

// webpack.production.config.js
module.exports = {
    mode: "production",
    entry: "./src/new.ts",
    output: {
      filename: "main.js"
    },
    devServer: {
      static: "./dist",
      open: true
    },
    stats: "errors-only",
    plugins: [ new MiniCssExtractPlugin(),
               new HtmlWebpackPlugin({
                template: "./src/index.pug",
                title: "Development",
              }),
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
        }, "css-loader"],
        test: /\.css$/
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        }
      },
      {
        test: /\.ts$/,
        use: "ts-loader"
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