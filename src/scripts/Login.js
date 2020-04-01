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
            name: 'LIVEEVIL1',
            num: 1,
            count:0
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
        this.counter();
        console.warn("--------------------------");
        // this.testPromise();
        // this.testGenerator();
        // this.testAsync();
        //给一个对象提供for of消费
        // Object.prototype[Symbol.iterator] = function(){
        //     let keys = Object.keys(this);
        //     let length = keys.length;
        //     let currentIndex = 0;
        //     return {
        //         next: () =>{
        //             let ob = {
        //                 value: currentIndex <= length - 1 ? this[keys[currentIndex]] : "nomore",
        //                 done: currentIndex > length -1
        //             };
        //             currentIndex++;
        //             return ob;
        //         }
        //     };
        // }
        // let testOb = {name:"ahaa",age:23,address:"中国重庆"};
        //
        // for(let i of testOb){
        //     console.log(i);
        // }
        // console.log("End");
        console.warn("--------------------------");
        function  testToString(){
            if(this === null) return "Null";
            if(this === undefined) return "Undefined";
            if(typeof this  === 'object') return "Object";
            if(typeof this  === 'function') return "Function";
            if(typeof this === 'string') return "String";
            if(typeof this === 'number') return "Number";
            if(typeof this === 'boolean') return "Boolean";
        }
        var a=1,b=false,c=undefined,d=null,e="",f=function () {};
        console.log(testToString.call(a),Object.prototype.toString.call(a));
        console.log(testToString.call(b),Object.prototype.toString.call(b));
        console.log(testToString.call(c),Object.prototype.toString.call(c));
        console.log(testToString.call(d),Object.prototype.toString.call(d));
        console.log(testToString.call(e),Object.prototype.toString.call(e));
        console.log(testToString.call(f),Object.prototype.toString.call(f));

    }
    mockPromise() {
        return new Promise(function (resolve, reject) {
           setTimeout(() => {
               let a = Math.random() * 10;
               if (a > 5) {
                   resolve(a);
               }
               else reject(a)
           },500);
        })
    };
    testAsync(){
        let mockPromise = this.mockPromise;
        async function mockGenerator(){
            let r1 = await mockPromise().catch(err => console.log(err));
            console.log(`这是第一次await结果：${r1}`);
            let r2 = await mockPromise().catch(err => console.log(err));
            console.log(`这是第二次await结果：${r2}`);
            return "end";
        }
        this.ge = mockGenerator();
    }
    testPromise(){
        this.mockPromise()
            .then((res) => {
                console.log(`这是成功的输出，a：${res}`);
                return this.mockPromise();
            }, res => {
                console.log(`这是失败的输出：a：${res}`);
                return this.mockPromise();
            })
            .then((res) => {
                console.log(`这是成功的输出，a：${res}`);
                return 1;
            }, res => {
                console.log(`这是失败的输出：a：${res}`);
                return 2;
            })
            .then((res) => console.log(`resolve:${res}`),res => console.log(`reject:${res}`));
    }

    testGenerator(){
        let mockPromise = this.mockPromise;
        function*mockGenerator(){
            console.log("开始执行");
            try {
                let a = yield mockPromise();
                let b = yield mockPromise();
                console.log("!!!!!",a,b);
                yield 3;
            } catch (e) {
                console.log('内部捕获', e);
            }
            return "end";
        }
        this.ge = mockGenerator();

    }

    doNext(){
        let temp = this.ge.next(11111);
        console.log(`currentValue:${JSON.stringify(temp)}`);
    }

    normalTest(){
        let element = this.testE;
        var start

        function step(timestamp) {
            console.log(timestamp);
            if (!start) start= timestamp;
            var progress = timestamp - start;
            element.style.left = Math.min(progress / 10, 200) + 'px';
            console.log( Math.min(progress / 10, 200) + 'px');
            if (progress < 2000) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // 冒泡排序
    bubbleSort(arr){
        for(let i = 0;i < arr.length;i++){
            for(let j = 0 ;j < arr.length-i-1;j++){
                if(arr[j+1] < arr[j]){
                    let temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }

    //选择排序
    selectSort(arr){
        for(let i = 0;i < arr.length;i++){
            let minIndex = i;
            for(let j = i+1;j< arr.length;j++){
                if(arr[j] < arr[minIndex]){
                    minIndex = j;
                }
            }
            console.log(`当前 最小数：`,minIndex);
            let temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
        console.log(arr);
    }

    //插入排序
    insertSort(arr){
        for(let i = 1;i < arr.length;i ++){
            let temp = arr[i];
            while(i >= 1 && arr[i-1] < temp){
                arr[i] = arr[i - 1];
                i--;
            }
            arr[i] = temp;
        }
        console.log(arr);
    }

    //快速排序
    fastSort(arr){
        if(arr.length <= 1) return arr;
        let middleValue = arr[Math.floor(arr.length/2)];
        let left = [];
        let right = [];
        for(let i = 0 ;i < arr.length ;i ++){
            if(arr[i] < middleValue) left.push(arr[i]);
            if(arr[i] > middleValue) right.push(arr[i]);
        }
        let result = [].concat(this.fastSort(left),[middleValue],this.fastSort(right));
        console.log(result);
        return result;
    }

    //希尔排序  数组，增量
    shellSort(arr){
        //[2,1,6,5,8,3,7,9,4]
        let length = arr.length;
        let incre = length;
        while(incre > 1){
            incre = Math.floor(incre/2);
            for(let i = 0;i < incre;i++){
                for(let j = i + incre;j<length;j+=incre){
                    let temp = arr[j];
                    while( j >= (i+incre) && arr[j-incre] > temp){
                        arr[j] = arr[j-incre];
                        j-=incre;
                    }
                    arr[j] = temp;
                }
            }
        }
        console.log(arr);
    }

    //归并排序
    mergeSort(arr){
        function mergeMain(arr1,first,last,temp){
            if(first < last){
                let middle = Math.floor((first + last)/2);
                //分
                mergeMain(arr1,first,middle,temp);
                mergeMain(arr1,middle+1,last,temp);
                //治
                mergeArr(arr1,first,middle,last,temp);
            }
        }

        function mergeArr(arr1,first,middle,end,temp){
            let i = first;
            let j = middle + 1;
            let t = 0;
            while(i <= middle && j <= end){
                if(arr1[i] <= arr1[j]){
                    temp[t++] = arr1[i++];
                }
                else{
                    temp[t++] = arr1[j++];
                }
            }
            
            while (i <= middle){
                temp[t++] = arr1[i++];
            }

            while (j <= end){
                temp[t++] = arr1[j++];
            }
            t = 0;
            while(first <= end){
                arr[first++] = temp[t++];
            }
        }
        mergeMain(arr,0,arr.length-1,[]);
        console.log(arr);
    }

    //堆排序  数据结构等同完全二叉树
    heapSort(arr1){
        let len;
        //首次建立最大堆
        function createMaxHeap(arr){
            len = arr.length;
            for(let i= Math.floor((len-1)/2);i >=0 ;i --){
                maxHeapFixdown(arr,i);
            }
        }

        function maxHeapFixdown(arr,i){
            let left = 2 * i + 1;//左子节点
            let right = 2 * i + 2;//右子节点
            let largest = i;
            if (left < len && arr[left] > arr[largest]) {
                largest = left;
            }

            if (right < len && arr[right] > arr[largest]) {
                largest = right;
            }

            if (largest != i) {
                swap(arr, i, largest);
                maxHeapFixdown(arr, largest);
            }
        }

        function swap(arr, i, j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        createMaxHeap(arr1);
        for(let i = arr1.length -1 ;i > 0; i--){
            swap(arr1, 0, i);//将最大数置于最后
            len --;//排除最大数后，重新建立最大堆
            maxHeapFixdown(arr1,0);
        }
        console.log(arr1);
    }

    //计数排序
    countSort(arr){
        let bucket = [],sortedIndex = 0,len = arr.length;
        for(let i = 0;i < len;i++){
            if(!bucket[arr[i]]){
                bucket[arr[i]] = 0;
            }
            bucket[arr[i]] ++;
        }
        console.log(bucket);
        for(let j = 0;j < bucket.length;j++){
            while(bucket[j] >0){
                arr[sortedIndex++] = j;
                bucket[j] --;
            }
        }
        console.log("计数排序",arr);
    }

    render() {
        return (
            <div className="Login">
                <div className="testFlex">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>
                <button onClick={() => this.doNext()}>Generator执行next</button>
                <br/>
                <button onClick={() => this.bubbleSort([2,1,6,5,8,3,7,9,4])}>冒泡</button>
                <br/>
                <button onClick={() => this.selectSort([2,1,6,5,8,3,7,9,4])}>选择排序</button>
                <br/>
                <button onClick={() => this.insertSort([2,1,6,5,8,3,7,9,4])}>插入排序</button>
                <br/>
                <button onClick={() => this.fastSort([2,1,6,5,8,3,7,9,4])}>快速排序</button>
                <br/>
                <button onClick={() => this.shellSort([2,1,6,5,8,3,7,9,4])}>希尔排序</button>
                <br/>
                <button onClick={() => this.mergeSort([2,1,6,5,8,3,7,9,4])}>归并排序</button>
                <br/>
                <button onClick={() => this.heapSort([2,1,6,5,8,3,7,9,4])}>堆排序</button>
                <br/>
                <button onClick={() => this.countSort([2,1,6,5,8,3,7,9,4])}>计数排序</button>
                <button className="normalTest" ref={e => this.testE = e} onClick={() => this.normalTest()}>测试{this.state.name}-{this.state.count}</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
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
        //如插件A B,
        //middlewares = [A,B]
        //chain = [A(middlewareAPI),B(middlewareAPI)]
        //dispatch = A1(B1(store.dispatch))
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