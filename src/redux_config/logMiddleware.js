//自定义一个日志中间件的例子
function log() {
    return ({ dispatch, getState }) => next => action => {
        console.log("！！开始dispatch，actionType为："+ ((typeof action === 'function') ? 'function' :action.type));
        next(action);
    };
}

export default log();