const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});


module.exports = {
    mode: 'production',
    entry:[path.resolve("src/index.js")],
    output: {
        path: path.resolve("build"),
        filename: 'src/js/[name].js'
    },
    resolve: {
        alias:{
            scss:path.resolve("src","scss")
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
                        presets: ["@babel/preset-react", "@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: path.resolve("node_modules"),
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './images/'
                        }
                    }
                ]
            }
        ]
    },
    watch: true,
    watchOptions: {
        // aggregateTimeout: 1000, //编译的延迟
        ignored: [/node_modules/],//忽略不必要的文件
        // poll: 500 // 轮询监听
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(['build']),
        extractSass,
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
        })
    ]
};

