'use strict';

import React from 'react';

import MonthlyPicksSidebarContainer from '../containers/monthly-picks-sidebar-container.jsx'; 
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
          {this.props.children}
          <MonthlyPicksSidebarContainer reduxState={this.props.reduxState}/>
        </div>)
    }
  }
});

export default MonthlyPicksPage;