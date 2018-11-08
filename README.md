#### [react源码阅读笔记](https://github.com/RongMine/webpack-with-react/tree/react-source-code "地址")
##### 阅读目的
- 梳理react虚拟dom首次渲染过程
- Fiber
- setState实现原理
- react事件处理
- diff算法
- 收获
- 思想总结

##### 源码目录: [react_source_code/packages](https://github.com/RongMine/webpack-with-react/tree/react-source-code/react_souce_code/packages)
##### 笔记目录: [react_note](https://github.com/RongMine/webpack-with-react/tree/react-source-code/react_note)

1. 梳理react虚拟dom首次渲染过程

  [1]. React.createElement：可以创建react元素：[源码及笔记](https://github.com/RongMine/webpack-with-react/blob/react-source-code/react_note/ReactElement.js)

  [2]. ReactDom.render: 将虚拟dom渲染成真实dom。

  [3]. stop

  [4]. react-fiber-architecture阅读 [原文地址](https://github.com/acdlite/react-fiber-architecture)

2. 收获

  2.1 Object.defineProperty；(可实现双向绑定)
    - 方式一：数据描述符——拥有可写或不可写值的属性
      ```javascript
Object.defineProperty(obj,"test",{
          configurable:true | false,//是否可以删除目标属性或是否可以再次修改属性的特性
          enumerable:true | false,//此属性是否可以被枚举（使用for...in或Object.keys()）
          value:任意类型的值,//属性对应的值，默认为undefined
          writable:true | false.//属性的值是否可以被重写
      });
```

    - 方式二：存取描述——由一对getter-setter函数功能来描述的属性
   ```javascript
 Object.defineProperty(obj,"newKey",{
        get:function (){} | undefined,//getter
        set:function (value){} | //setter
        configurable: true | false
        enumerable: true | false
    });
```