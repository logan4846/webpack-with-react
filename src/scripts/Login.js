import React, {Component} from 'react';
import 'scss/Login.scss';
import CT from '../components/ComponentTest';
import CTForwardingRefs from '../components/ComponentTestForwardingRefs';
import UseRenderProps from  '../components/UseRenderProps';
import RenderProps from '../components/RenderProps';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'LIVEEVIL',
            num:1
        }
        this.myRef = React.createRef();
    }

    counter(){
        setInterval(() => {
            this.setState((prevState,props) => ({num:prevState.num+1}))
        },1000)
    }

    handleSubmit(e){
        console.log(this.state.name);
        e.preventDefault();
    }

    getInputDom(){
        // console.log(this.input);方式一
        console.log(this.myRef.current);//方式二
    }

    getComponent(){
        console.log(this.child);
    }

    getComponentDom(){
        console.log(this.myRef.current);
    }

    componentDidMount(){
        console.log(this.props.match.params);
        this.counter();
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="test">计时器：{this.state.num}</div>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                    </label>
                    {/*<input type="submit" value="Submit" ref={(e) => this.input = e}/> 方式一*/}
                    {/*<input type="submit" value="Submit" ref={this.myRef}/>*/}
                    {/*<button onClick={() => this.getInputDom()}>getInputDom</button>*/}
                    <button onClick={() => this.props.history.push('/home/3')}>登陆</button>
                </form>
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

export default Login;