import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../actions/midleware';
import loggerMidleware from '../actions/loggerMidleware';
import reducers from '../reducers';

function reduxStore(preloadedState) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
      reducers,
      preloadedState,
      composeEnhancers(
        applyMiddleware(
          promiseMiddleware,
          loggerMidleware
        )
      )
  );
  /* eslint-enable */

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;
