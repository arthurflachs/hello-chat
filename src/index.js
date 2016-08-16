import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';

require('reset.css');

const container = document.getElementById('app');

const middlewares = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middlewares);

render((
  <Provider store={store}>
    <App />
  </Provider>
), container);
