const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

let config = {
    mode: 'development',
    entry: [path.resolve("src/index.dev.js")],
    output: {
        path: path.resolve("build"),
        filename: 'src/js/[name].js'
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
                        plugins: ["react-hot-loader/babel"]
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
        //---react-hot-loader ,
        // development环境state改变不更新，但会保留当前的state
        // production环境state改变更新，但不会保留state

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        new HtmlWebpackPlugin({
            inject: true,//注入javascript方式 true/head/body/false
            template: 'src/index.html',//模板
            minify: {
                removeComments: true,
                collapseWhitespace: true,//去除标签之间的空格
                removeRedundantAttributes: true,//移除多余属性设置 如 <input type="text" /> => <input />
                useShortDoctype: true, //<!DOCTYPE html>处理
                removeEmptyAttributes: true,//移除空白属性  如class=""
                removeStyleLinkTypeAttributes: true,//移除 <link/>中的type="text/css"，其他值不动
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.HotModuleReplacementPlugin()//启动热更新
    ]
};

module.exports = config;