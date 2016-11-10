'use strict';

import React from 'react';
import StandingsContainer from '../containers/standings-container.jsx';

// import PredictionsSummaryContainer from '../containers/predictions-summary-container.jsx'; 
// import StatusMessage from '../status-message.jsx';

const DashboardPage = React.createClass({
  componentDidMount: function() {
    // this.props.getUserMonthData(this.props.reduxState.activeMonth);
    // this.props.getGameData(this.props.reduxState.activeMonth);
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <StandingsContainer />
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="jumbotron">
            <div className="panel-boody">
              <h4>(Eventually) Click on a player to view all of their picks for the month.</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default DashboardPage;