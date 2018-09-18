import React, {Component} from 'react';
import photo from './images/logo.jpg';
import 'scss/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is a title'
        }
    }

    changeTitle(){
        this.setState({title:this.state.title+this.state.title});
    }

    render() {
        return (
            <div className="App" onClick={() => this.changeTitle()}>
                <div>{this.state.title}</div>
                <img className="photo" src={photo} alt=""/>
                <div className="photo"> </div>
                <div style={{fontWeight:'bold',background: 'url(' + photo + ') no-repeat center/cover'}}>memo</div>
                <div className="special"> </div>
            </div>
        )
    }
}

export default App;