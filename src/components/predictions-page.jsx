'use strict';

import React from 'react';

import GamesViewerContainer from './containers/games-viewer-container.jsx';
import RemainingTeamsContainer from './containers/remaining-teams-container.jsx'; 

const api = React.createClass({
  componentDidMount: function() {
    this.props.getUserMonthData()
    this.props.getGameData()
  },
  render: function() {
    return (
      (this.props.reduxState.isFetchingPredictions || this.props.reduxState.isFetchingGameData) ?
      <div>Loading games data... </div> :
      <div className={'row '+(this.props.reduxState.isSendingPrediction ? 'send-waiting' : '')}>
        <RemainingTeamsContainer reduxState={this.props.reduxState}/>
        <GamesViewerContainer reduxState={this.props.reduxState}/>
      </div>)
  }
});

export default api;