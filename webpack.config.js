const path = require('path');
const appDirectory = path.resolve();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});


module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: appDirectory,
        filename: '[name].css',
        publicPath: "/assets/"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath : './images/'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(appDirectory, "scss")
                ],
                exclude: [
                    path.resolve(appDirectory, "node_modules")
                ],
                //{loader: "style-loader"} // 将 JS 字符串生成为 style 节点,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }
                    ]
                })
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
        extractSass
    ]
};

