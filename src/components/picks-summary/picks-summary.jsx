'use strict';

import React from 'react';

import StatusMessage from '../status-message.jsx';
import JoinMonth from '../utility/join-month.jsx';
import UpcomingPicks from './upcoming-picks.jsx';

const PicksSummary = React.createClass({
  render: function() {
    let panelContent, panelTitle;
    if (this.props.missingUserMonth) {
      panelContent = <JoinMonth activeMonth={this.props.activeMonth} activeLeagueId={this.props.activeLeagueId} createNewUserMonth={this.props.createNewUserMonth} showDashboardTour={this.props.showDashboardTour}/>;
      panelTitle = `Join ${moment(this.props.activeMonth).format('MMMM')} Competition`;
    } else if (this.props.activeUserMonth && this.props.activeUserMonth.userMonthId) {
      panelContent = <UpcomingPicks activeMonth={this.props.activeMonth} currentDate={this.props.currentDate} currentMonth={this.props.currentMonth} activeUserMonth={this.props.activeUserMonth} goToDate={this.props.goToDate} />
      panelTitle = `My Upcoming Picks`;
    } else {
      panelContent = <StatusMessage messageBold={'Loading user picks data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>;
      panelTitle = "Loading";
    }
    return (
      <div className="panel panel-default panel-black picks-summary">
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