'use strict';

import React from 'react';
import StatusMessage from '../status-message.jsx';
import JoinMonth from './join-month.jsx';
import UpcomingPicks from './upcoming-picks.jsx';

const PicksSummary = React.createClass({
  render: function() {
    let panelContent, panelTitle;
    if (this.props.missingUserMonth) {
      panelContent = <JoinMonth createNewUserMonth={this.props.createNewUserMonth} getStandingsData={this.props.getStandingsData}/>;
      panelTitle = "Join New Month";
    } else if (this.props.userMonth && this.props.userMonth.userMonthId) {
      panelContent = <UpcomingPicks userMonth={this.props.userMonth} />
      panelTitle = "My Upcoming Picks";
    } else {
      panelContent = <StatusMessage messageBold={'Loading user picks data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>;
      panelTitle = "Loading";
    }
    return (
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">{panelTitle}</div>
        </div>
        <div className="panel-body">
          {panelContent}
        </div>
      </div>
    );
  }
});

export default PicksSummary;