/*eslint-disable */
export const testMiddleware = store => next => action => {
    console.log(`Action type: ${action.type}, data: ${action.data}`);
    return next(action);
};
/*eslint-enable */