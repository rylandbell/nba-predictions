'use strict';

import React from 'react';
import StandingsContainer from '../containers/standings-container.jsx';
import PicksOverviewContainer from '../containers/picks-overview-container.jsx';

// import PredictionsSummaryContainer from '../containers/predictions-summary-container.jsx'; 
// import StatusMessage from '../status-message.jsx';

const DashboardPage = React.createClass({
  componentDidUpdate: function() {
    // this.props.getUserMonthData(this.props.reduxState.activeMonth);
    // this.props.getGameData(this.props.reduxState.activeMonth);
  },
  render: function() {
    if (this.props.missingUserMonth) {
      return <h2>No Dice!</h2>
    } else {
      return (
        <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-4">
            <PicksOverviewContainer />
            <StandingsContainer />
          </div>
        </div>
      )
    }
  }
});

export default DashboardPage;