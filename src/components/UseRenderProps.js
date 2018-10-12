import React, {Component} from 'react';

class UseRenderProps extends Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src={"../../images/logo.jpg"} style={{ position: 'absolute', left: mouse.x, top: mouse.y,width:'50px',height:'50px' }} />
        );
    }
}

export default UseRenderProps