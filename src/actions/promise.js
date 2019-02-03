import { PROMISE_RUN } from '../constants/promise.constant';

export const run = (key, promise, options = { skipLoadingState: false }) => ({
    type: PROMISE_RUN,
    key,
    promise,
    ...options
});

export default {
    run
};
