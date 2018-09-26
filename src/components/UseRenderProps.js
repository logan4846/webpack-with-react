import React, {Component} from 'react';
import logo from '../images/logo.jpg';

class UseRenderProps extends Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src={logo} style={{ position: 'absolute', left: mouse.x, top: mouse.y,width:'50px',height:'50px' }} />
        );
    }
}

export default UseRenderProps