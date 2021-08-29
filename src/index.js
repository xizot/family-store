import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom';
import { history } from './helpers';
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
