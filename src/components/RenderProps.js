import React, {Component} from 'react';

class RenderProps extends Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '200px' }} onMouseMove={(e) =>this.handleMouseMove(e)}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

export default RenderProps