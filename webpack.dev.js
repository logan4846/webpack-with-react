const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

let config = {
    mode: 'development',
    entry: [path.resolve("src/APP.js")],
    output: {
        path: path.resolve("build"),
        filename: 'App.js'
    },
    resolve: {
        alias: {
            scss: path.resolve("src", "scss")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve("node_modules"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                        plugins: ["react-hot-loader/babel","@babel/plugin-syntax-dynamic-import"]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: path.resolve("node_modules"),
                use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
                //style-loader支持热更新便于开发
                //ExtractTextPlugin不支持开发调试，用于生产环境分割css
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    devtool: "source-map",
    devServer:{
        hot: true,
        compress: true,
        host: 'localhost',
        stats: 'errors-only'
    },
    plugins:[
        // react-hot-loader下 react-hot-loader/index.js
        // development环境state改变不更新，但会保留当前的state
        // production环境state改变更新，但不会保留state

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            inject: true,//注入javascript方式 true/head/body/false
            template: 'src/index.html',//模板
        }),
        new webpack.HotModuleReplacementPlugin()//启动热更新
    ]
};

module.exports = config;