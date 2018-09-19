import React, {Component} from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div className="Home">
                首页
            </div>
        )
    }
}

export default Home;