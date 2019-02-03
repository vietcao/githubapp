let nonce = 0;
export default () => next => (action) => {
    if (!action.promise) {
        return next(action);
    }
    // eslint-disable-next-line no-unused-vars
    const { promise, skipLoadingState, ...rest } = action;
    if (!skipLoadingState) {
        nonce++;
        next({ ...rest, payload: { loading: true, nonce } });
    }
    nonce++;
    return action.promise.then(
        result => next({ ...rest, payload: { loading: false, result, nonce } }),
        error => next({ ...rest, payload: { loading: false, error, nonce }})
    );
};
