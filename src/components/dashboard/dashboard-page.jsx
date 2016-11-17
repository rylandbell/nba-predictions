'use strict';

import React from 'react';
import StandingsContainer from '../containers/standings-container.jsx';
import PicksSummaryContainer from '../containers/picks-summary-container.jsx';
import DashboardJumbotron from './dashboard-jumbotron.jsx';

// import MonthlyPicksSidebarContainer from '../containers/monthly-picks-sidebar-container.jsx'; 
// import StatusMessage from '../status-message.jsx';

const DashboardPage = React.createClass({
  render: function() {
    if (this.props.missingUserMonth) {
      return <h2>No Dice!</h2>
    } else {
      return (
        <div className="row full-height-parent">
          <div className="col-xs-12 col-md-7 col-lg-7 full-height-child full-height-parent">
            <DashboardJumbotron />
          </div>
          <div className="col-xs-12 col-md-5 col-lg-5">
            <PicksSummaryContainer />
            <StandingsContainer />
          </div>
        </div>
      )
    }
  }
});

export default DashboardPage;