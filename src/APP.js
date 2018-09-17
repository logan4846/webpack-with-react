import React, { Component } from 'react';
import photo from './images/logo.jpg';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'this is a title'
        }
    }

    componentWillMount(){
        console.log(1);
        document.addEventListener("touchstart", function(e) {},{passive: false});
    }

    render () {
        return (
            <div className="App">
                <div>{this.state.title}</div>
                <img className="photo" src={photo} alt=""/>
                <div className="photo"> </div>
            </div>
        )
    }
}

export default App;