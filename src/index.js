import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import initStore from "./initStore";
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware } from 'react-router-redux'

const history = createHistory();
export const middleware = routerMiddleware(history)

ReactDOM.render(
  <Provider store={initStore(middleware)}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
