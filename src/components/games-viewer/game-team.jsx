'use strict';

import React from 'react';
import _ from 'lodash';

const api = React.createClass({
  handleClick: function () {
    if(this.props.isSendingPrediction){
      return
    } else {
      const isEligible = _.includes(this.props.eligibleTeams, this.props.teamName);
      const isChosen = this.props.predictedWinner.teamName === this.props.teamName;
      if((isEligible || isChosen) && !this.props.gameData.gameStatus.hasStarted){
        if(isChosen) {
          this.props.removePrediction(this.props.gameData.gameId, this.props.teamName, this.props.gameData.gameDate);
        } else {
          this.props.addPrediction(this.props.gameData.gameId, this.props.teamName, this.props.gameData.gameDate);
        }
      }
    }
  },
  render: function () {    
    const isChosen = this.props.predictedWinner.teamName === this.props.teamName;
    const isEligible = _.includes(this.props.eligibleTeams, this.props.teamName);  
    const successfulPrediction = (isChosen && this.props.predictedWinner.outcome === 'success');
    const failedPrediction = (isChosen && this.props.predictedWinner.outcome === 'failure'); 

    const clickable = isEligible || this.props.predictedWinner.teamName === this.props.teamName;

    return (
      <div className="game-item game-team" onClick={this.handleClick}>
        <div className="team-container">
          <div className={'team-item team-name ' + (clickable ? 'eligible-team' : 'ineligible-team') + (isChosen ? ' selected-team' : '') + (successfulPrediction ? ' victory-team ' : '') + (failedPrediction ? ' defeat-team ' : '')} >
            <h4>{this.props.teamName}</h4>
            <div className={'logo '+this.props.teamName.toLowerCase()}></div>
          </div>
        </div>
      </div>
    );
  }
});

export default api;