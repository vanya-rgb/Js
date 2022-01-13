const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
      ],
      module: {
        rules: [
        
          {
            test: /.s?css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
            minify: CssMinimizerPlugin.cleanCssMinify,
          }),
          new TerserPlugin(),
        ]
    },
    devServer: {
      static: {

      },
      compress: true,
      port: 9000,
    },
    resolve: {
      extensions: ['.js']
    }
}