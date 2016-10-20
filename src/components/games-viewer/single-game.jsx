'use strict';

import React from 'react';

import GameTeam from './game-team.jsx';
import GameStatus from './game-status.jsx';

const api = ({gameData, predictedWinner, isSendingPrediction, eligibleTeams, addPrediction, removePrediction}) => {
  
  //color the panel border appropriately:
  // var panelType = 'panel-default';
  // if (gameData.roadTeam.teamName === predictedWinner || gameData.homeTeam.teamName === predictedWinner) {
  //   panelType = 'panel-primary';
  // }
  // if ((gameData.roadTeam.isWinner && gameData.roadTeam.teamName === predictedWinner) || (gameData.homeTeam.isWinner && gameData.homeTeam.teamName === predictedWinner)) {
  //   panelType = 'panel-success';
  // }
  // if ((gameData.roadTeam.isLoser && gameData.roadTeam.teamName === predictedWinner) || (gameData.homeTeam.isLoser && gameData.homeTeam.teamName === predictedWinner)) {
  //   panelType = 'panel-danger';
  // }

  return (
    <div className="col-xs-12 col-md-6">
      <div className={'panel panel-default game-panel'}>
        <div className="panel-body">
          <div className={'game-container ' + (gameData.gameStatus.hasStarted ? '':'game-not-started')}>
            <GameTeam gameData={gameData} teamName={gameData.roadTeam} predictedWinner={predictedWinner} isSendingPrediction={isSendingPrediction} eligibleTeams = {eligibleTeams} homeVsRoad={'roadTeam'} addPrediction={addPrediction} removePrediction={removePrediction}/>
            <GameStatus statusData={gameData.gameStatus} roadData={gameData.roadTeam} homeData={gameData.homeTeam}/>
            <GameTeam gameData={gameData} teamName={gameData.homeTeam} predictedWinner={predictedWinner} isSendingPrediction={isSendingPrediction} eligibleTeams = {eligibleTeams} homeVsRoad={'homeTeam'} addPrediction={addPrediction} removePrediction={removePrediction}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default api;