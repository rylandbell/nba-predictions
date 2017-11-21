import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import persistState from 'redux-localstorage';
import Alert from 'react-s-alert';
import Promise from 'promise-polyfill'; 

import * as reducers from './reducers/root';
import routes from './routes.jsx';
import { apiMiddleware } from './middleware/apiMiddleware';
import { userFlowMiddleware } from './middleware/userFlowMiddleware';

// Add promise polyfill to window
if (!window.Promise) {
  window.Promise = Promise;
}

// (Enables Redux dev tools in browser)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(userFlowMiddleware, apiMiddleware),
    persistState(['activeLeagueId'])
  )
);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          {routes}
        </Router>
        <Alert />
      </div>
    </Provider>,
    document.getElementById('app-root')
  );
}

store.subscribe(render);
render();

//~~~~~~Bootstrap/jQuery~~~~~~~~

//Hide nav menu once an item is selected
$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
    $(this).collapse('hide');
  }
});
