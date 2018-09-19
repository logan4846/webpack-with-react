import React, {Component} from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import { cube } from './config/tools.js';
import {Login,Home} from './scripts/index';
import photo from './images/logo.jpg';
import 'scss/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LIVEEVIL'
        }
    }

    test(){
        cube(2);
    }

    render() {
        return (
            <div className="App" onClick={() => this.test()}>
                <div className="header">
                    <div className="name">{this.state.name}</div>
                    <img className="photo" src={photo} alt=""/>
                </div>
                <div className="content">
                    <div className="app-left">left</div>
                    <div className="app-container">
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Login}/>
                                <Route exact path="/home/:id" component={Home}/>
                            </Switch>
                        </Router>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;