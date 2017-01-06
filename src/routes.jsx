'use strict';

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import LayoutContainer from './components/containers/layout-container.jsx';
import MonthlyPicksContainer from './components/containers/monthly-picks-container.jsx';
import DailyPicksContainer from './components/containers/daily-picks-container.jsx';
import DashboardPage from './components/dashboard/dashboard-page.jsx';
import FullStandingsPageContainer from './components/containers/full-standings-page-container.jsx';
import RulesPanel from './components/dashboard/rules-panel.jsx';
import ChatContainer from './components/containers/chat-container.jsx';
import GenericNotFound from './components/generic-not-found.jsx';


const Routes = (
  <Route path ="/" component={LayoutContainer}>
    <IndexRoute component={DashboardPage}/>
    <Route path="/picks" component={MonthlyPicksContainer}>
      <Route path="/picks/:month/:day" component = {DailyPicksContainer} />
        <Route path = "*" component={GenericNotFound} />
    </Route>
    <Route path="/standings" component = {FullStandingsPageContainer} />
    <Route path="/chat" component = {ChatContainer} />
    <Route path="/how-to-play" component={RulesPanel} />
    <Route path = "*" component={GenericNotFound} />
  </Route>
);

export default Routes;