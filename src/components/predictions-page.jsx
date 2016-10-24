'use strict';

import React from 'react';
import Alert from 'react-s-alert';

import GamesViewerContainer from './containers/games-viewer-container.jsx';
import PredictionsSummaryContainer from './containers/predictions-summary-container.jsx'; 
import StatusMessage from './status-message.jsx';
import AlertTest from './alert-test.jsx';

const api = React.createClass({
  componentDidMount: function() {
    this.props.getUserMonthData(this.props.reduxState.activeMonth);
    this.props.getGameData(this.props.reduxState.activeMonth);
  },
  render: function() {
    const isLoading = this.props.reduxState.isFetchingPredictions || this.props.reduxState.isFetchingGameData;
    const isError = this.props.reduxState.errorMessage.showError;
    return (
      (isLoading || isError) ?
      <StatusMessage messageBold={'Loading game data...'} messageBody={'Just hang tight.'} messageClass={'info'}/> :
      <div className={'row '+(this.props.reduxState.isSendingPrediction ? 'send-waiting' : '')}>
        <GamesViewerContainer reduxState={this.props.reduxState}/>
        <PredictionsSummaryContainer reduxState={this.props.reduxState}/>
        <Alert />
        <AlertTest />
        
      </div>)
  }
});

export default api;