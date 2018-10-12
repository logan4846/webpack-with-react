import React, {Component} from 'react';
import {StaticRouter as Router,Route,Switch} from 'react-router-dom';
import {Login,Home} from '../scripts/index';
import store from "../redux_config/store";
import { Provider } from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LIVEEVIL'
        }
    }

    componentWillMount(){
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <div className="header">
                        <div className="name">{this.state.name}</div>
                        <img className="photo" src={"../images/logo.jpg"} alt=""/>
                    </div>
                    <div className="content">
                        <div className="app-left">left</div>
                        <div className="app-container">
                            <Router location={this.props.locaiton} context={this.props.context}>
                                <Switch>
                                    <Route exact path="/" component={Login}/>
                                    <Route exact path="/home/:id" component={Home}/>
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;