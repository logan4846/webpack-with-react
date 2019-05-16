import React, {Component} from 'react';

export default function (CP) {
    return class extends React.Component{
        constructor(props) {
            super(props);
        }

        render(){
            return (
                <CP {...this.props} />
            )
        }
    }
}