'use strict';

import React from 'react';

import GamesViewerContainer from './containers/games-viewer-container.jsx';
import PredictionsSummaryContainer from './containers/predictions-summary-container.jsx'; 
import StatusMessage from './status-message.jsx';

const api = React.createClass({
  componentDidMount: function() {
    this.props.getUserMonthData(this.props.reduxState.activeMonth);
    this.props.getGameData(this.props.reduxState.activeMonth);
  },
  render: function() {
    const isLoading = this.props.reduxState.isFetchingPredictions || this.props.reduxState.isFetchingGameData;
    return (
      isLoading?
      <StatusMessage messageBold={'Loading game data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
      :
      <div className={'row '+(this.props.reduxState.isSendingPrediction ? 'send-waiting' : '')}>
        <GamesViewerContainer reduxState={this.props.reduxState}/>
        <PredictionsSummaryContainer reduxState={this.props.reduxState}/>
      </div>)
  }
});

export default api;