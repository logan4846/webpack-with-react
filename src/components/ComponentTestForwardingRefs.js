import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ComponentTestForwardingRefs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content:'this is a component test'
        }
    }

    render() {
        const {forwardedRef, ...rest} = this.props;
        return (
            <div className="ComponentTestForwardingRefs" ref={forwardedRef} {...rest} >
                <div>{this.state.content}</div>
                <div>{this.props.name}</div>
                <div>{this.props.age}</div>
            </div>
        )
    }
}

//类型检查
ComponentTestForwardingRefs.propTypes = {
    name: PropTypes.string
};

//默认值
// 为属性指定默认值:
ComponentTestForwardingRefs.defaultProps = {
    age: 'defaultValue'
};


export default React.forwardRef((props, ref) => {
    return <ComponentTestForwardingRefs {...props} forwardedRef={ref} />;
});