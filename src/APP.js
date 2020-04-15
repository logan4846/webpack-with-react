import React, {Component} from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import {Login} from './scripts/index';
import photo from './images/logo.jpg';
import 'scss/App.scss';

//预加载
import Loadable from 'react-loadable';
import Loading from './components/Loading';
const LoadableHome = Loadable({
    loader: () => import('./scripts/Home'),
    loading:Loading
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LIVEEVIL'
        }
    }

    test(){

    }

    render() {
        return (
            <div className="App">
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
                                <Route exact path="/home/:id" component={LoadableHome}/>
                            </Switch>
                        </Router>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;