#### [react源码阅读笔记](https://github.com/RongMine/webpack-with-react/tree/react-source-code "地址")
##### 阅读目的
- 梳理react虚拟dom首次渲染过程
- Fiber
- setState实现原理
- react事件处理
- diff算法
- 思想总结

##### 源码目录: [react_source_code/packages](https://github.com/RongMine/webpack-with-react/tree/react-source-code/react_souce_code/packages)
##### 笔记目录: [react_note](https://github.com/RongMine/webpack-with-react/tree/react-source-code/react_note)

1.梳理react虚拟dom首次渲染过程

  [1]. React.createElement：可以创建react元素：[源码及笔记](https://github.com/RongMine/webpack-with-react/blob/react-source-code/react_note/ReactElement.js)

  [2]. ReactDom.render: 将虚拟dom渲染成真实dom。

  [3]. stop