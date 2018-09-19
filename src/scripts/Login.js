import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div className="Login">
                <button onClick={() => this.props.history.push('/home/3')}>登陆</button>
            </div>
        )
    }
}

export default Login;