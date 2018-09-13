import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'this is a title'
        }
    }

    render () {
        return (
            <div className="App">
                <div>{this.state.title}</div>
            </div>
        )
    }
}

export default App;