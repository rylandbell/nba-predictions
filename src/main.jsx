'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Redux from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Alert from 'react-s-alert';

import Reducers from './reducers.js';
import ActionCreator from './action-creators.js';
import LayoutContainer from './components/containers/layout-container.jsx';
import MonthlyPicksContainer from './components/containers/monthly-picks-container.jsx';
import DailyPicksContainer from './components/containers/daily-picks-container.jsx';
import DashboardPage from './components/dashboard/dashboard-page.jsx';
import RulesPanel from './components/dashboard/rules-panel.jsx';
import GenericNotFound from './components/generic-not-found.jsx';

const store = Redux.createStore(Reducers.app);
store.subscribe(render);

console.log('webpack testing');

//pass date data to Redux store if route looks like /picks/2016/:month/:day
const dateToRedux = function () {
  let pathArray = window.location.pathname.split('/');
  if (pathArray[1] === 'picks') {
    store.dispatch(ActionCreator.setActiveDate(pathArray[2],pathArray[3]));
  }
}

//call dateToRedux on initial load, and again whenever the browserHistory updates
dateToRedux();
browserHistory.listen(dateToRedux);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          <Route path ="/" component={LayoutContainer}>
            <IndexRoute component={DashboardPage}/>
            <Route path="/picks" component={MonthlyPicksContainer}>
              <Route path="/picks/:month/:day" component = {DailyPicksContainer} />
                <Route path = "*" component={GenericNotFound} />
            </Route>
            <Route path="/how-to-play" component={RulesPanel} />
            <Route path = "*" component={GenericNotFound} />
          </Route>
        </Router>
        <Alert />
      </div>
    </Provider>,
    document.getElementById('app-root')
  );
}

render();