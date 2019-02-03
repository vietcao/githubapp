/**
 * Logs all actions and states after they are dispatched.
 */
const loggerMidleware = store => next => (action) => {
  // If it's loading toggle action ignore.
  if (action.payload && action.payload.loading === true) {
    let result = next(action);
    return result;
  }

  // Log current state, dispatching action, next state.
  // logger.debug('*...*');
  // logger.debug('current state', store.getState());
  // logger.debug('dispatching  ', action);
  let result = next(action);
  if (result.payload && result.payload.error) {
    logger.error(result.payload.error);
  }
  // logger.debug('next state   ', store.getState());
  // logger.debug('*...*');
  return result;
};

export default loggerMidleware;