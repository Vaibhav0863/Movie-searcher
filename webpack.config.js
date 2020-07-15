const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: ["@babel/polyfill", "./src/js/app.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: 'assets',
                },
            },
            {
                test: /\.html$/i,
                use: ["html-loader"]
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new Dotenv()
    ]
}