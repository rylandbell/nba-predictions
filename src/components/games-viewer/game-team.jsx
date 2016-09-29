'use strict';

import React from 'react';
import _ from 'lodash';

const api = React.createClass({
  handleClick: function () {
    if(this.props.isSendingPrediction){
      return
    } else {
      const isEligible = _.includes(this.props.eligibleTeams, this.props.teamData.teamName);
      const isChosen = this.props.predictedWinner === this.props.teamData.teamName;
      if((isEligible || isChosen) && !this.props.gameData.gameStatus.hasStarted){
        if(isChosen) {
          this.props.removePrediction(this.props.gameData.gameId, this.props.teamData.teamName, this.props.gameData.gameDate);
        } else {
          this.props.addPrediction(this.props.gameData.gameId, this.props.teamData.teamName, this.props.gameData.gameDate);
        }
      }
    }
  },
  render: function () {
    const isChosen = this.props.predictedWinner === this.props.teamData.teamName;
    const isEligible = _.includes(this.props.eligibleTeams, this.props.teamData.teamName);
    const clickable = isEligible || this.props.predictedWinner === this.props.teamData.teamName;
    return (
      <div className="game-item game-team" onClick={this.handleClick}>
        <div className="team-container">
          <div className={'team-item team-name ' + (clickable ? 'eligible-team' : 'ineligible-team') + (isChosen ? ' selected-team' : '')} >
            <h4>{this.props.teamData.teamName}</h4>
            <div className={'logo '+this.props.teamData.teamName.toLowerCase()}></div>
          </div>
        </div>
      </div>
    );
  }
});

// <img src={'/images/logos/'+this.props.teamData.teamName+'.png'} className="logo"/>

export default api;