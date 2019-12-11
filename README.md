#### [webpack-with-react](https://github.com/RongMine/webpack-with-react "地址")
##### 本示例包含内容
- react、scss、ES6支持
- 热更新支持react、scss
- 代码分离，文件缓存
- 文件压缩
- 支持redux，自定义中间件示例目录：src/redux_config/logMiddleware.js
- webpack配置解析
- redux、redux-thunk部分源码分析
- [服务端渲染简单示例为ssr分支](https://github.com/RongMine/webpack-with-react/tree/ssr "地址")

##### 演示步骤
- 运行 > yarn  安装依赖包
- 运行 > yarn start 进入开发环境
- 运行 > yarn build 打包到build文件
- 运行 > yarn run server 运行json-server(可选)

##### 环境：webpack 4.17.1
###### 已下是笔记内容

#### webpack
- [webpack解析](https://github.com/RongMine/webpack-with-react/blob/master/webpack-doc.js "webpack解析")

------------

#### redux
- [流程图，点击查看](http://static.logan4846.com/images/github/redux.png "同步流程图查看")

- [有中间件流程图，点击查看](http://static.logan4846.com/images/github/redux_m.png "有中间件流程图，点击查看")

- [applyMiddleware源码](https://github.com/RongMine/webpack-with-react/blob/master/src/scripts/Login.js "applyMiddleware源码") **位于文件底部**

------------

#### redux-thunk解析

###### 配置说明

[src/index.dev.js](https://github.com/RongMine/webpack-with-react/blob/master/src/index.dev.js "目录：/index.dev.js")
```javascript
 <Provider store={store}>
            <App/>
 </Provider>
```

[/src/redux_config/store.js](https://github.com/RongMine/webpack-with-react/blob/master/src/redux_config/store.js "/src/redux_config/store.js")
```javascript
...;
export default createStore(
    rootReducer,
    applyMiddleware(log,thunk.withExtraArgument({
        getUsers:'http://localhost:3000/users/1'
    }))
);

//不带参数使用    applyMiddleware(thunk)
//带额外参数使用  applyMiddleware(thunk.withExtraArgument(api))
```

[/src/scripts/Login.js](https://github.com/RongMine/webpack-with-react/blob/master/src/scripts/Login.js "/src/scripts/Login.js")
```javascript
//mapStateToProps  决定state的哪部分注入到当前props,当state改变时调用
const mapStateToProps = state => state.Login;

//{createPart1Action}  注入到props的action，并调用自动dispatch，使用的方式有两种：
//方式一：函数：(dispatch,ownProps) => ({do1:dispatch(action)})：在组件创建时会被调用一次，
//方式二：包含action创建函数的对象，当调用props里面对应函数时自动dispatch {createAction1,createAction2},推荐
const mapDispatchToProps = actions;

/*connect 的常用方式：
 不注入action creators:
 1.connect()(component)；可以通过this.props.dispatch(action)，但是获取不到state,state改变也不会更新
 2.connect(mapStateToProps)(component) 可以通过this.props.dispatch(action)，当state.Login改变时更新
 注入 action creators:
 3.connect(null,mapDispatchToProps)(Component)  可以通过this.props.createPart1Action自动触发action，但是获取不到state,state改变也不会更新
 4.connect(mapStateToProps,mapDispatchToProps)(Component) 可以通过this.props.createPart1Action自动触发action，当state.Login改变时更新
*/
export default connect(mapStateToProps,mapDispatchToProps)(Login);
```
###### 源码

```javascript
function createThunkMiddleware(extraArgument) {
  //--dispatch，当前中间件的dispatch，
  //--getState，可获取当前state的function,
  //--next    , 下个中间件的dispatch
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
	//如果action是一个函数，则执行函数并注入参数
      return action(dispatch, getState, extraArgument);
    }
   //不是一个函数，则调用下一个中间件的dispatch
    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```


