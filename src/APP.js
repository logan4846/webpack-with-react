import React, {Component} from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import {Login,Home} from './scripts/index';
// import photo from './images/logo.jpg';
import ReactDOMServer from "react-dom/server";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LIVEEVIL'
        }
    }

    render() {
        return (
            <div className="App">
                <div className="header">
                    <div className="name">{this.state.name}</div>
                    {/*<img className="photo" src={photo} alt=""/>*/}
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

export var AppContent = ReactDOMServer.renderToString(<App/>);