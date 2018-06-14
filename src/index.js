import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import RecipeForm from './components/RecipeForm';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import initStore from './initStore';

const history = createHistory();
export const middleware = routerMiddleware(history)

ReactDOM.render(
  <Provider store={initStore(middleware)}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/recipe-form/:id?" component={RecipeForm}/>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
