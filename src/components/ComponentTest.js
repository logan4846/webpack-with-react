import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ComponentTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content:'this is a component test'
        }
    }

    render() {
        const {forwardedRef, ...rest} = this.props;
        return (
            <div className="Component" ref={forwardedRef} {...rest} >
                <div>{this.state.content}</div>
                <div>{this.props.name}</div>
                <div>{this.props.age}</div>
            </div>
        )
    }
}

//类型检查
ComponentTest.propTypes = {
    name: PropTypes.string
};

//默认值
// 为属性指定默认值:
ComponentTest.defaultProps = {
    age: 'defaultValue'
};

export default ComponentTest;