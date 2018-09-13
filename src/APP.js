import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'webpack-learn'
        }
    }

    render () {
        return (
            <div className="APP">
                <title>{this.state.title}</title>
            </div>
        )
    }
}

export default App;