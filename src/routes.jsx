import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import LayoutContainer from './components/layout.jsx';
import MonthlyPicksContainer from './components/monthly-picks/monthly-picks.jsx';
import DashboardContainer from './components/dashboard/dashboard-page.jsx';
import FullStandingsPageContainer from './components/full-standings/full-standings-page.jsx';
import RulesPanel from './components/dashboard/rules-panel.jsx';
import ChatContainer from './components/chat/chat-wall.jsx';
import LeagueAdminContainer from './components/league-admin/league-admin.jsx';
import GenericNotFound from './components/generic-not-found.jsx';

const routes = (
  <Route path ="/" component={LayoutContainer}>
    <IndexRoute component={DashboardContainer}/>
    <Route path="/picks" component={MonthlyPicksContainer}>
      <Route path = "*" component={GenericNotFound} />
    </Route>
    <Route path="/standings" component = {FullStandingsPageContainer} />
    <Route path="/chat" component = {ChatContainer} />
    <Route path="/leagues" component = {LeagueAdminContainer} />
    <Route path="/how-to-play" component={RulesPanel} />
    <Route path = "*" component={GenericNotFound} />
  </Route>
);

export default routes;