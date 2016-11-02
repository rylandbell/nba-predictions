'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Redux from 'redux';
import { Router, Route, hashHistory } from 'react-router'
import Alert from 'react-s-alert';

import Reducers from './reducers.js';
import MonthlyPicksContainer from './components/containers/monthly-picks-container.jsx';

const store = Redux.createStore(Reducers.app);
store.dispatch({type:'SET_ACTIVE_MONTH', month: activeMonth});
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={MonthlyPicksContainer} />
        </Router>
        <Alert />
      </div>
    </Provider>,
    document.getElementById('app-root')
  );
}

render();