const HTMLPlagin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
    },
    plugins: [
        new HTMLPlagin({
            filename: 'index.html',
            template:'./src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                
            },
            {
                test: /\.less$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader", "less-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader",],
                
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ]
    }
}