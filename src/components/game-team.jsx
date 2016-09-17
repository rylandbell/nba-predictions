'use strict';

import React from 'react';

import TeamMessage from './team-message.jsx';

const api = React.createClass({
  handleClick: function () {
    const isEligible = this.props.eligibleTeams[this.props.teamData.teamName];
    const isChosen = this.props.predictedWinner === this.props.teamData.teamName;
    if((isEligible || isChosen) && !this.props.gameData.gameStatus.hasStarted){
      if(isChosen) {
        this.props.removePrediction(this.props.gameData.gameId, this.props.teamData.teamName, this.props.gameData.gameDate);
      } else {
        this.props.addPrediction(this.props.gameData.gameId, this.props.teamData.teamName, this.props.gameData.gameDate);
      }
    }
  },
  render: function () {
    const isEligible = this.props.eligibleTeams[this.props.teamData.teamName];
    const clickable = isEligible || this.props.predictedWinner === this.props.teamData.teamName;
    return (
      <div className="game-item game-team" onClick={this.handleClick}>
        <div className="team-container">
          <div className={'team-item team-name '' + (clickable ? 'eligible-team' : 'ineligible-team')} >
            <h4>{this.props.teamData.teamName}</h4>
          </div>
          {(this.props.teamData.teamName === this.props.predictedWinner ? <TeamMessage teamData={this.props.teamData}/> : '')}
        </div>
      </div>
    );
  }
});

export default api;