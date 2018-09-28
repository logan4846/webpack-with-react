import { CHANGE_CONTENT,HTTP_SUCCESS,HTTP_ERROR } from "../actionTypes";

export default function(state = {
    title:'hello part1 redux'
}, action) {
    switch (action.type) {
        case CHANGE_CONTENT:
            return {
                ...state,
                title:action.title
            };
        case HTTP_SUCCESS:
            alert("请求完成");
            return {
                ...state,
                ...action.res
            };
        default:
            return state;
    }
}
