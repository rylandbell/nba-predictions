'use strict';

import React from 'react';

import GameTeam from './game-team.jsx';
import GameStatus from './game-status.jsx';

const api = ({gameData}) => {
  var panelType = 'panel-default';
  if (gameData.roadTeam.isChosen || gameData.homeTeam.isChosen) {
    panelType = 'panel-primary';
  }
  if (gameData.roadTeam.isWinner || gameData.homeTeam.isWinner) {
    panelType = 'panel-success';
  }
  if (gameData.roadTeam.isLoser || gameData.homeTeam.isLoser) {
    panelType = 'panel-danger';
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className={"panel " + panelType}>
        <div className="panel-body">
          <div className={"game-container " + (gameData.gameStatus.hasStarted ? "":"game-not-started")}>
            <GameTeam teamData={gameData.roadTeam}/>
            <GameStatus statusData={gameData.gameStatus}/>
            <GameTeam teamData={gameData.homeTeam}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default api;