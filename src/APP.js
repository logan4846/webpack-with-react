import React, { Component } from 'react';
import {sum} from './config/tools';
import photo from './images/logo.jpg';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'this is a title'
        }
    }

    alertMsg(){
       console.log(sum(1,2));
    }

    render () {
        return (
            <div className="App" onClick={this.alertMsg}>
                <div>{this.state.title}</div>
                <img className="photo" src={photo} alt=""/>
                <div className="photo"> </div>
            </div>
        )
    }
}

export default App;