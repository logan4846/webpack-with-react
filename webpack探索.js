const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].wxss"
});
/* Version 4.17.1
使用方式
安装webpack ，webpack命令

node模式：
const webpack = require('webpack');
let compiler = webpack(config);
compiler.run(config.watchOptions, (err, stats) => {});
例子：https://github.com/RongMine/scss-for-miniprogram

更多方式查看官方文档
*/

module.exports = {
    /*模式(development、production、none)
    development：会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
    production: 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    none:不选用任何默认优化选项

    cli传入：webpack --mode=production
    */
    mode:'production',

    /*入口
    单入口；
    entry:'../src/index.js'
    输出1个文件，对应的output的内置对象 =》   [name].js => main.js

    多入口（主要用于输出同一出口或同一文件）
    entry:[
        '../src/index.js',
        '../src/main.js',
        '../src/start.js‘
    ]
    输出1个文件，对应的output的内置对象 =》   [name].js => main.js

    多入口（主要用于输出不同出口或不同文件）：
    entry:{
        index:'../src/index.js',    对应的output的内置对象 =》   [name].js => index.js
        data/main:'../src/main.js', 对应的output的内置对象 =》   [name].js => data文件下的main.js  （path处理）
        start:'../src/start.js‘
    }
    输出3个文件，
    */
    entry:{},

    /*出口（控制向磁盘写入编译文件）
    注：正常情况下即使存在多个入口，单只有一个
    内置变量[name]、[hash]
    output:{
      path:输出的文件目录          必填
      filename:输出的文件名        必填
      publicPath:输出解析文件的目录
      library:导出库的名称
      libraryTarget:导出库的类型
      pathinfo:
      chunkFilename: "[id].js",
      chunkFilename: "[chunkhash].js",
      jsonpFunction: "myWebpackJsonp",
      sourceMapFilename: "[file].map",
      sourceMapFilename: "sourcemaps/[file].map",
      devtoolModuleFilenameTemplate: "webpack:///[resource-path]",
      devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]",
      umdNamedDefine: true,
      crossOriginLoading: "use-credentials",
      crossOriginLoading: "anonymous",
      crossOriginLoading: false,
      **********以下专家级输出配置（自行承担风险)
        devtoolLineToLine: {
            test: /\.jsx$/
        },
        hotUpdateMainFilename: "[hash].hot-update.json",
        hotUpdateChunkFilename: "[id].[hash].hot-update.js",
        sourcePrefix: "\t",
    }

    */
    output: {
        path: appDirectory,
        filename: '[name].wxss'
    },

    /*模块
      rules:[
         test:打包前，哪些文件进行处理或转换
         use:使用的loader（loader作用:转换某些类型的模块）
             loader: 使用方式配置、内联、cli
             配置：
             1.npm install或yarn add loader-name
             2.use:[loader-name,loader-name]或use:[{ loader:loadername:options:{} }]
             loader处理可以理解为一个promise
      ]
    */
    module: {
        rules: [
            {
                test: /\.scss$/,
                include:[
                    path.resolve(appDirectory, "scss")
                ],
                exclude: [
                    path.resolve(appDirectory, "node_modules")
                ],
                //{loader: "style-loader"} // 将 JS 字符串生成为 style 节点,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            }
        ]
    },
    watch:true,
    watchOptions: {
        // aggregateTimeout: 1000, //编译的延迟
        ignored: [/node_modules/],//忽略不必要的文件
        // poll: 500 // 轮询监听
    },
    devtool: "source-map",

    /*插件（作用：打包优化、资源管理、注入环境变量）
    const Plugin = require("插件名称")
    plugins:[
        new Plugin(...),
        new Plugin(...),
        ...
    ]
    列表：
    ExtractTextPlugin： 提取css到独立的文件，webpack4需使用4.0及以上版本
    CommonsChunkPlugin：提取公共代码块
    HtmlWebpackPlugin:  生成一个html模板
    */
    plugins: [
        extractSass
    ]
};

/*补充
* 1.模块热替换（应用运行过程中替换、添加或删除模块而无需重新加载整个页面）
*
*
*
*
*
*
* */


