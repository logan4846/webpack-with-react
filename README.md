#### [webpack-learn](https://github.com/RongMine/webpack-learn "地址")
##### 本示例包含内容
- react、scss、ES6支持
- 热更新支持react、scss
- 代码分离，文件缓存
- 文件压缩

##### 演示步骤
- 运行 > yarn  安装依赖包
- 运行 > yarn start 进入开发环境
- 运行 > yarn build 打包到build文件

##### 环境：webpack 4.17.1

------------


##### 已下是webpack笔记内容
###### 使用方式
1. webpack命令

2. node模式：
const webpack = require('webpack');
let compiler = webpack(config);
compiler.run(config.watchOptions, (err, stats) => {});
例子：https://github.com/RongMine/scss-for-miniprogram

*更多方式查看官方文档*

##### 解析

```javascript
    module.exports =    {
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
          publicPath:输出解析文件的目录  主要是连接资源文件
                  如：“/assets/“ <link href="/assets/main.css" rel="stylesheet">   index.html
                      ““         <link href="main.css" rel="stylesheet">          index.html
          library:导出库的名称         ________
          libraryTarget:导出库的类型   --------自己写库的时候使用，暴露变量或对象
          pathinfo:true
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
            {
             test:打包前，哪些文件进行处理或转换,必须匹配选项  :一般匹配文件名
             include:必须匹配选项                          :一般匹配文件路径
             exclude:必不匹配选项（优先于 test 和 include）
             use:使用的loader（loader作用:转换某些类型的模块）
                 loader: 使用方式配置、内联、cli
                 配置：
                 1.npm install或yarn add loader-name
                 2.use:[loader-name,loader-name]或use:[{ loader:loadername:options:{} }]
                 loader处理可以理解为一个promise
             issuer: { test, include, exclude },导入源
             loader:  效果等于 use: [ { loader } ]
             loaders: use别名
             oneOf:  当规则匹配时，只使用第一个匹配规则。
             options/query: 相当于use: [ { options } ]缩写
             parser: 解析器 ？
             resource: 匹配项（Rule.test，Rule.exclude 和 Rule.include）
             resourceQuery:匹配？后面的
             rules: 。。。
             sideEffects: false,如果一方法无副作用，可以设置false移除
            }
          ]
        */
        /*loader列表详细说明
        * style-loader 将解析并将css并入页面的style标签内
        * css-loader   处理css文件，包括其中的图片url
        * scss-loader  处理scss文件
        * url-loader   像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
        * file-loader  处理import的文件，如图片，字体等
        * csv-loader   处理csv文件，默认支持json文件引入 如：import json from './json';
        * xml-loader   处理xml文件
        * */
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

        /* 解析模块
        * */
        resolve: {
            modules:["node_modules",path.resolve("src")],//告诉webpack解析时应该搜素的目录
            extensions: ['.js','.json'],//自动解析确定的扩展 如 improt A from './index';  index.js =无？==> index.json
            alias:{name:path.resolve("src","A","B","scss")},//设置别名：import "./src/A/B/scss/a.scss  => import "name/a.scss"
            //高级配置
            symlinks: false,
            descriptionFiles: ["package.json"],
            mainFields: ["main"],
            aliasFields: ["browser"],
            enforceExtension: false,
            moduleExtensions: ["-module"],
            enforceModuleExtension: false,
            unsafeCache:true,
            //unsagfeCache:{},
            cachePredicate:(path,request) => true,
            plugins: []
        },

        /*SplitChunksPlugin的使用*/
        optimization: {
            runtimeChunk: 'single',//
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        //!!!!!!!可继承或重写splitChunks里面的配置
                        test: path.resolve("node_modules"),//正则匹配或绝对路径
                        name: 'vendors',//生成的文件
                        chunks: 'all',//initial(初始块)、async(按需加载块)、all(全部块);
                        priority:10  //优先级
                    },
                    components:{
                        test:path.resolve("src","config"),//正则匹配或绝对路径
                        name: 'commons',
                        chunks: 'all'
                    }
                },
                chunks: 'all',//initial(初始块)、async(按需加载块)、all(全部块);
                name:true,//设置true按照cacheGroups的key生产，默认vender
                automaticNameDelimiter: '_',//分隔符
                //minSize: 30000,     //生成块的最小大小
                //minChunks: 1,       //在分割之前的最小块数
                maxAsyncRequests: 5,//按需加载并行最大请求数
                maxInitialRequests: 3,//入口点并行请求最大数
                //...
            }
        },

        /* 性能提示
       * */
        performance: {
            hints: "warning", // 提示类型  false/warning/error
            maxEntrypointSize: 400000, // 最大体积 默认250000
            assetFilter: function(assetFilename) {  //过滤计算性能提示的文件]
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        },

        /* 开发工具
      * */
        devtool: "source-map",//控制生成和如何生成source-map

        /* 服务器环境webpack-server/webpack-dev-server
      * */
        serve: { //object
            port: 1337,
            content:'./dist',
            // ...
        },
        devServer: {
            proxy: {
                '/api': 'http://localhost:3000'
            },
            contentBase: path.join(__dirname, 'public'), // 用于访问静态文件的路径
            compress: true, // 启动压缩
            hot: true, // 启动热跟新
            noInfo: true, // 控制台无输出信息
            // ...
        },

        /* 入口上下文
      * */
        context: __dirname,

        /* 构建目标
      * */
        target:'web',

        /* 外部扩展
      * */
        externals: {
            //不将依赖编译到bundle，让其依赖本地环境
            // key:项目中引入资源的名称  value:资源，
            "react": 'react',  //   =======>  module.exports.react = react
            "react-dom": 'react-dom'  //   =======>  module.exports.react = require('react-dom');
            //例 index.html => <script crossOrigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script> 暴露全局React
            //externals: {
            //         react: "React"
            // },  相当于 module.exports.react = React
        },
        ///////externals: "react", // string（精确匹配）
        ///////externals: /^[a-z\-]+($|\/)/, // 正则
        ///////externals: { // 对象
        ///////    angular: "this angular", // this["angular"]
        ///////    react: { // UMD
        ///////        commonjs: "react",
        ///////        commonjs2: "react",
        ///////        amd: "react",
        ///////        root: "React"
        ///////    }
        ///////},
        ///////externals: (request) => { /* ... */ return "commonjs " + request }

        /* 统计信息 主要用于开发，错误跟踪
         * */
        stats: "errors-only",

        /* 观察模式
         * */
        watch:true,
        watchOptions: {
            // aggregateTimeout: 1000, //编译的延迟
            ignored: [/node_modules/],//忽略不必要的文件
            // poll: 500 // 轮询监听
        },


        /*插件（作用：打包优化、资源管理、注入环境变量）
        const Plugin = require("插件名称")
        plugins:[
            new Plugin(...),
            new Plugin(...),
            ...
        ]
        列表：
        ExtractTextPlugin： 提取css到独立的文件，webpack4需使用4.0及以上版本
        CommonsChunkPlugin：提取公共代码块，!!!!!!!!!!!!4.x已废弃
        HtmlWebpackPlugin:  生成一个html模板
        webpack.HotModuleReplacementPlugin()  内置——启动热更新，配合webpack-dev-server使用
        webpack.DefinePlugin(a:'"b"'):  编译时配置环境变量，仅限插件内部
        SplitChunksPlugin: 代码分离
        new webpack.ProvidePlugin({
           React:'react',
           ReactDOM:'react-dom',
           Component:['react','Component']
        })   提供全局变量，这些变量不必再import了
        new webpack.HashedModuleIdsPlugin() //用于生产环境，文件名生成处理，避免vendor文件hash没必要更新
        */
        plugins: [
            extractSass
        ]
    };
```


