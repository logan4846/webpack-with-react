import {
    CHANGE_CONTENT,
    HTTP_SUCCESS,
    HTTP_ERROR
} from './actionTypes';
import Http from 'axios';

let createChangeContent = title => ({
    type:CHANGE_CONTENT,
    title:title
});

let HttpResponse = (type,msg,res) => ({
    type:type,
    msg:msg,
    res:res
});

let httpGet = () => {
    return function(dispatch,getState,extraArgument){
        setTimeout(() => {
            Http.get(extraArgument.getUsers)
                .then(
                    res => dispatch(HttpResponse(HTTP_SUCCESS,'请求成功',res.data)),
                    res => dispatch(HttpResponse(HTTP_ERROR,'请求失败',res.data))
                )
        },3000);//加延迟测试
    }
};

export {
    createChangeContent,
    httpGet,
}