'use strict';

import React from 'react';

import GameTeam from './game-team.jsx';
import GameStatus from './game-status.jsx';

const api = ({gameData, addPrediction, removePrediction}) => {
  var panelType = 'panel-default';
  if (gameData.roadTeam.isChosen || gameData.homeTeam.isChosen) {
    panelType = 'panel-primary';
  }
  if ((gameData.roadTeam.isWinner && gameData.roadTeam.isChosen) || (gameData.homeTeam.isWinner && gameData.homeTeam.isChosen)) {
    panelType = 'panel-success';
  }
  if ((gameData.roadTeam.isLoser && gameData.roadTeam.isChosen) || (gameData.homeTeam.isLoser && gameData.homeTeam.isChosen)) {
    panelType = 'panel-danger';
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className={"panel game-panel " + panelType}>
        <div className="panel-body">
          <div className={"game-container " + (gameData.gameStatus.hasStarted ? "":"game-not-started")}>
            <GameTeam gameData={gameData} homeVsRoad={'roadTeam'} addPrediction={addPrediction} removePrediction={removePrediction}/>
            <GameStatus statusData={gameData.gameStatus}/>
            <GameTeam gameData={gameData} homeVsRoad={'homeTeam'} addPrediction={addPrediction} removePrediction={removePrediction}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default api;