'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import persistState from 'redux-localstorage';
import Alert from 'react-s-alert';

import Reducers from './reducers/reducers.js';
import Routes from './routes.jsx';
import { apiMiddleware } from './middleware/apiMiddleware';
import { userFlowMiddleware } from './middleware/userFlowMiddleware';

// (Enables Redux dev tools in browser)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducers.app,
  composeEnhancers(
    applyMiddleware(userFlowMiddleware, apiMiddleware),
    persistState()
  )
);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          {Routes}
        </Router>
        <Alert />
      </div>
    </Provider>,
    document.getElementById('app-root')
  );
}

//don't actually run anything on login page:
if (window.location.pathname !== "/login") {  
  store.subscribe(render);
  render();
}

//~~~~~~Bootstrap/jQuery~~~~~~~~

//Hide nav menu once an item is selected
$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
    $(this).collapse('hide');
  }
});

