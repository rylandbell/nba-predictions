'use strict';


//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Redux from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import Alert from 'react-s-alert';

import Reducers from './reducers.js';
import ActionCreator from './action-creators.js';
import LayoutContainer from './components/containers/layout-container.jsx';
import MonthlyPicksContainer from './components/containers/monthly-picks-container.jsx';
import DailyPicksContainer from './components/containers/daily-picks-container.jsx';
import DashboardPage from './components/dashboard/dashboard-page.jsx';
import FullStandingsPageContainer from './components/containers/full-standings-page-container.jsx';
import RulesPanel from './components/dashboard/rules-panel.jsx';
import GenericNotFound from './components/generic-not-found.jsx';

const store = Redux.createStore(Reducers.app);

const routes = (
  <Route path ="/" component={LayoutContainer}>
    <IndexRoute component={DashboardPage}/>
    <Route path="/picks" component={MonthlyPicksContainer}>
      <Route path="/picks/:month/:day" component = {DailyPicksContainer} />
        <Route path = "*" component={GenericNotFound} />
    </Route>
    <Route path="/standings" component = {FullStandingsPageContainer} />
    <Route path="/how-to-play" component={RulesPanel} />
    <Route path = "*" component={GenericNotFound} />
  </Route>
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

//don't actually run anything on login page:
if (window.location.pathname !== "/login") {
  
  //pass date data from path to Redux store if current path looks like /picks/2016/:month/:day
  const dateToRedux = function () {
    let pathArray = window.location.pathname.split('/');
    if (pathArray[1] === 'picks') {
      store.dispatch(ActionCreator.setActiveDate(pathArray[2],pathArray[3]));
    }
  }

  //call dateToRedux on initial load, and again whenever the browserHistory updates
  dateToRedux();
  browserHistory.listen(dateToRedux);

  store.subscribe(render);
  render();
}

//Bootstrap/jQuery

//Hide nav menu once an item is selected
$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
    $(this).collapse('hide');
  }
});
