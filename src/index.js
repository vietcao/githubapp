import 'babel-polyfill';
import 'whatwg-fetch';

import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import './utils/logger-init';
import App from './components/App';
import configureStore from './store';
import defaultState from './store/defaultState';
// import { loadState, saveState } from './store/localStorage';

// Config store.
// const savedState = loadState();
// const state = { ...defaultState, ...savedState };

const store = configureStore(defaultState);
// store.subscribe(() => {
  // saveState(store.getState());
// });

logger.debug('App is running');

// Render App.
// Render App.
render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module && module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NewApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}