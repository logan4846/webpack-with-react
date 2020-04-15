import React, {Component} from 'react';
import 'scss/Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num:1,
        }
    }

    // static getDerivedStateFromProps(e){
    //     return {
    //         num:1,
    //         val:1,
    //     }
    // }

    componentDidMount() {
        if (this.props.match)
            console.log(this.props.match.params)
        document.getElementsByClassName("bfc1")[0].addEventListener("click",function(e){
            console.log("hhhhh");
            // e.stopPropagation();
        })
    }

    //图片上传方式一
    submit1(e) {
        console.log(e.target.files);
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (res) => {
            console.log(res);
            let data = res.target.result;
        }
    }

    //图片上传方式二
    submit2(e) {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("file", file);
        let http = new XMLHttpRequest();
        http.open("POST", "https://www.baidu.com/post");
        http.send(formData);
        http.onload = (res) => {
            console.log(res);
        }
    }

    debounce(fn){
        if(this.timeOut) clearTimeout((this.timeOut))
        this.timeOut = setTimeout(() => {
            if(fn) fn();
            clearTimeout((this.timeOut));
        },2000)
    }

    clickTest(e){
        console.log(this.ele)
        console.log("--------",e.nativeEvent);
        e.preventDefault();
       // this.debounce(() => {
       //     console.log(this.ele)
       //     console.log("--------");
       //     this.setState({num:this.state.num +1},() => {
       //         console.log(this.state.num);
       //     });
       //     this.setState((state,props) => ({
       //         num:state.num+1
       //     }));
       //     this.setState((state,props) => ({
       //         num:state.num+1
       //     }));
       //     console.log(this.state.memo,this.state.num);
       //     e.stopPropagation();
       // })
    }

    testAsync(){
        setTimeout(() => {
            this.setState({num:this.state.num + 1})
            console.log("state",this.state.num);
            this.setState({num:this.state.num + 1})
            console.log("state",this.state.num);
        },200);
        return;

        let p = () => {
            return new Promise((resolve,reject) => {
                this.setState({num:this.state.num + 1})
                this.setState({num:this.state.num + 1})
                console.log("state",this.state.num);
                setTimeout(() => {
                    let res = Math.random() * 10;
                    if(res > 5) resolve(res);
                    else reject(res);
                },2000)
            })
        }


        async function tt(){
            let r1 = await 1;
            let r2 = await null;
            let r3 = await  p() ;
            console.log("hai------------");
            return  r1 + r2 + r3 + "结束"
        }

        tt().then(res => console.log(res),res => console.log("err",res));

    }

    render() {
        return ([
            ((
                <div className="Home" key="2" onClick={(e) => this.clickTest(e)} key={1}>
                    首页
                    <div>
                        <div>base64上传图片</div>
                        <input type="file" onChange={(e) => this.submit1(e)}/>
                    </div>
                    <hr/>
                    <div>
                        <div>formData上传图片</div>
                        <input type="file" onChange={(e) => this.submit2(e)}/>
                    </div>
                    <hr />
                    <div className="bfc1" onClick={(e) => this.clickTest(e) } ref={(ele) =>this.ele = ele} hidden>
                        <div>bfc1{this.state.num}</div>
                        <div onClick={(e) => this.clickTest(e)}>bfc1</div>
                        <div>bfc1</div>
                    </div>
                    <div className="bfc2">
                        <div>bfc2</div>
                        <div>测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动测试浮动</div>
                    </div>
                </div>
            )),
            <div className="gridDemo" key={2} onClick={()=> this.testAsync()}>
                <div className="g-item"></div>
                <div className="g-item"></div>
                <div className="g-item"></div>
                <div className="g-item"></div>
            </div>
        ])
    }
}

export default Home;