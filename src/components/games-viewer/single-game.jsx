'use strict';

import React from 'react';

import GameTeam from './game-team.jsx';
import GameStatus from './game-status.jsx';

const api = ({gameData, predictedWinner, isSendingPrediction, eligibleTeams, addPrediction, removePrediction}) => {
  
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