'use strict';

import React from 'react';

import PredictionsSummaryContainer from '../containers/predictions-summary-container.jsx'; 
import StatusMessage from '../status-message.jsx';
import UserMonthNotFound from './usermonth-not-found.jsx';

const MonthlyPicksPage = React.createClass({
  componentDidMount: function() {
    this.props.getUserMonthData(this.props.reduxState.activeMonth);
    this.props.getGameData(this.props.reduxState.activeMonth);
  },
  render: function() {
    const isLoading = this.props.reduxState.isFetchingPredictions || this.props.reduxState.isFetchingGameData;

    if (isLoading) {
      return <StatusMessage messageBold={'Loading game data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
    } else if (this.props.reduxState.missingUserMonth) {
      return <UserMonthNotFound />
    } else {
      return (
        <div className={'row '+(this.props.reduxState.isSendingPrediction ? 'send-waiting' : '')}>
          {this.props.children}
          <PredictionsSummaryContainer reduxState={this.props.reduxState}/>
        </div>)
    }
  }
});

export default MonthlyPicksPage;