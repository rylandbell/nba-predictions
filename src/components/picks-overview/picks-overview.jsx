'use strict';

import React from 'react';
import StatusMessage from '../status-message.jsx';
import JoinMonth from './join-month.jsx';
import UpcomingPicks from './upcoming-picks.jsx';

const PicksOverview = React.createClass({
  componentDidMount: function() {
    const currentMonth = moment().format('YYYY-MM');
    this.props.getUserMonthData(currentMonth);
  },
  render: function() {
    let panelContent, panelTitle;
    if (this.props.missingUserMonth) {
      panelContent = <JoinMonth />;
      panelTitle = "Join New Month";
    } else if (this.props.userMonth && this.props.userMonth.userMonthId) {
      panelContent = <UpcomingPicks userMonth={this.props.userMonth} />
      panelTitle = "My Upcoming Picks";
    } else {
      panelContent = <StatusMessage messageBold={'Loading user picks data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>;
      panelTitle = "Loading";
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">{panelTitle}</div>
        </div>
        <div className="panel-body panel-black">
          {panelContent}
        </div>
      </div>
    );
  }
});

export default PicksOverview;