#### [webpack-with-react](https://github.com/RongMine/webpack-with-react/tree/ssr "地址")
##### 服务端渲染简单示例
- express构建基本路由，中间件，模板引擎
- webpack处理客户端js，babel处理服务端js并用ReactDOMServer.renderToString生成页面字符串
- node-sass处理scss
- 合并css、js到模板
- 返回路由页面

##### 演示步骤
- 运行 > yarn  安装依赖包
- 运行 > yarn run ssr

##### 服务端渲染和 客户端渲染的不同点

- 效果上：数据直出数据（包括：将数据请求和数据渲染放在后端，css变成inline，那么剩下的就是：
      同构后：用户输入url→服务端处理（node）返回html→拉取js→渲染
      同构前：用户输入url→返回html→拉取css→拉取js→拉取数据→页面渲染）

- 代码处理上：
  - 如用到react-router的需要按照文档换成StaticRouter
  - 后端处理虚拟dom，故无法调用真实dom的方法
  - 服务端的生命周期只有componentWillMount、render
  - 服务端处理生成html后只有静态的页面，需要客户端再次做事件绑定。
  - http请求上需要用支持后端的，如axios
  - node目前8.11.3不支持import，可以用babel使其支持
  - 服务端css和js需要自己用模板进行合并处理