'use strict';

import React from 'react';
import PicksWidget from './picks-widget.jsx';
import OutcomesWidget from './outcomes-widget.jsx';

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
        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
          <PicksWidget />
          <OutcomesWidget />
        </div>
        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9">
          <div className="jumbotron">
            <div className="panel-boody">
              <h4>Something goes here?</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default DashboardPage;