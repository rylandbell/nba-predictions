'use strict';

import React from 'react';

import MonthlyPicksSidebarContainer from '../containers/monthly-picks-sidebar-container.jsx';
import DailyPicksContainer from '../containers/daily-picks-container.jsx';
import MonthlyPicksMonthSelector from './monthly-picks-month-selector.jsx';
import StatusMessage from '../status-message.jsx';
import UserMonthNotFound from './usermonth-not-found.jsx';

const MonthlyPicksPage = React.createClass({
  componentDidMount: function() {
    this.props.getUserMonthData(this.props.reduxState.activeMonth);
    this.props.getGameData(this.props.reduxState.activeMonth);
    document.title = document.title.split(' | ')[0] + ' | My Picks';
  },
  render: function() {
    const isLoading = this.props.reduxState.fetchStatus.isFetchingPredictions || this.props.reduxState.fetchStatus.isFetchingGameData;

    if (isLoading) {
      return <StatusMessage messageBold={'Loading game data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
    } else if (this.props.reduxState.fetchStatus.missingUserMonth) {
      return <UserMonthNotFound />
    } else {
      return (
        <div className={'row '+(this.props.reduxState.fetchStatus.isSendingPrediction ? 'send-waiting' : '')}>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <DailyPicksContainer />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <MonthlyPicksMonthSelector />
            <MonthlyPicksSidebarContainer reduxState={this.props.reduxState} />
          </div>
        </div>)
    }
  }
});

export default MonthlyPicksPage;