'use strict';

import React from 'react';

import TeamMessage from './team-message.jsx';

const api = React.createClass({
  handleClick: function () {
    const homeVsRoad = this.props.homeVsRoad;
    const teamData = this.props.gameData[homeVsRoad];
    if(teamData.isEligible && !this.props.gameData.gameStatus.hasStarted){
      if(teamData.isChosen) {
        this.props.removePrediction(this.props.gameData.gameId, this.props.homeVsRoad);
      } else {
        this.props.addPrediction(this.props.gameData.gameId, this.props.homeVsRoad);
      }
    }
  },
  render: function () {
    const homeVsRoad = this.props.homeVsRoad;
    const teamData = this.props.gameData[homeVsRoad];
    return (
      <div className="game-item game-team" onClick={this.handleClick}>
        <div className="team-container">
          <div className={"team-item team-name " + (teamData.isEligible?"eligible-team":"ineligible-team")} >
            <h4>{teamData.teamName}</h4>
          </div>
          {(teamData.isChosen ? <TeamMessage teamData={teamData}/> : '')}
        </div>
      </div>
    );
  }
});

export default api;