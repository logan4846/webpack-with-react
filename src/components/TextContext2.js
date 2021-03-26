import React, {Component} from 'react';
import UserContext from '../components/UserContext';


export  default  class TextContext2 extends  React.Component{
    static contextType = UserContext;

    render(){
        return(
            <div>
                context2 !!!!
                {this.props.children}
                {this.context.name}
            </div>
        )
    }
}
