import React, {Component} from 'react';
import 'scss/Login.scss';
import CT from '../components/ComponentTest';
import CTForwardingRefs from '../components/ComponentTestForwardingRefs';
import UseRenderProps from '../components/UseRenderProps';
import RenderProps from '../components/RenderProps';

import {connect} from "react-redux";
import * as actions from "../redux_config/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LIVEEVIL',
            num: 1
        }
        this.myRef = React.createRef();
    }

    counter() {
        this.interval = setInterval(() => {
            this.setState((prevState, props) => ({num: prevState.num + 1}))
        }, 1000)
    }

    handleSubmit(e) {
        console.log(this.state.name);
        e.preventDefault();
    }

    getInputDom() {
        // console.log(this.input);方式一
        console.log(this.myRef.current);//方式二
    }

    getComponent() {
        console.log(this.child);
    }

    getComponentDom() {
        console.log(this.myRef.current);
    }

    componentDidMount() {
        console.log(this.props);
        console.log(this.props.match.params);
        this.counter();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="Login">
                <div onClick={() => this.props.createChangeContent("Change State redux")}>{this.props.title}</div>
                <div onClick={() => console.log(this.props)}>打印props</div>
                <div onClick={() => this.props.httpGet()}>(redux中间件)发送http</div>
                <hr/>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="test">计时器：{this.state.num}</div>
                    <label>
                        Name:
                        <input type="text" value={this.state.name}
                               onChange={(e) => this.setState({name: e.target.value})}/>
                    </label>
                    {/*<input type="submit" value="Submit" ref={(e) => this.input = e}/> 方式一*/}
                    {/*<input type="submit" value="Submit" ref={this.myRef}/>*/}
                    {/*<button onClick={() => this.getInputDom()}>getInputDom</button>*/}
                    <button onClick={() => this.props.history.push('/home/3')}>登陆</button>
                </form>
                <hr/>
                <CT name="name" ref={(e) => this.child = e}/>
                <CTForwardingRefs name="name" ref={this.myRef}/>
                <button onClick={() => this.getComponent()}>获取子组件实例</button>
                <button onClick={() => this.getComponentDom()}>通过传递refs获取子组件DOM</button>
                <hr/>
                <div>propsRenderTest</div>
                <RenderProps render={(mouse) => (<UseRenderProps mouse={mouse}/>)}/>
            </div>
        )
    }
}

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
//中间件middleware相当于对dispatch的再次包装，使用applyMiddleware来处理多个中间件
//applyMiddleware
// 源码
/*export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
            const store = createStore(...args)
            let dispatch = () => {
                throw new Error(
                    `Dispatching while constructing your middleware is not allowed. ` +
                    `Other middleware would not be applied to this dispatch.`
                )
            }

            const middlewareAPI = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            }
            const chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        //store.dispatch作为参数传入chain最后一个函数
        //如插件A B
        A1 = A(middlewareAPI);
        B1 = B(middlewareAPI);
        dispatch = A1(B1(store.dispatch))
        return {
            ...store,
            dispatch
        }
    }
}*/
//中间件原理：view ====> 被修改后的dispatch(action) =====> 中间件处理，并提供原始dispatch ======>dispatch(action) ====> reducers ====>view
//例子：redux-thunk，下面源码
/*
function createThunkMiddleware(extraArgument) {
  --dispatch，当前中间件的dispatch，
  --getState，可获取当前state的function,
  --next    , 下个中间件的dispatch
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument); //如果action是一个函数，则执行函数并注入参数
    }

    return next(action); //不是一个函数，则调用下一个中间件的dispatch
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
*
* */