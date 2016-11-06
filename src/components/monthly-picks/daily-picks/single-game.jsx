'use strict';

import React from 'react';

import GameTeam from './game-team.jsx';
import GameStatus from './game-status.jsx';

const api = ({gameData, predictedWinner, isSendingPrediction, eligibleTeams, userMonth, activeMonth, addPrediction, removePrediction}) => {
  
  return (
    <div className="col-xs-12 col-md-6">
      <div className={'panel panel-default game-panel'}>
        <div className="panel-body">
          <div className={'game-container ' + (gameData.gameStatus.hasStarted ? '':'game-not-started')}>
            <GameTeam gameData={gameData} teamName={gameData.roadTeam} predictedWinner={predictedWinner} isSendingPrediction={isSendingPrediction} eligibleTeams = {eligibleTeams} homeVsRoad={'roadTeam'} userMonth={userMonth} activeMonth={activeMonth} addPrediction={addPrediction} removePrediction={removePrediction}/>
            <GameStatus statusData={gameData.gameStatus} roadTeam={gameData.roadTeam} homeTeam={gameData.homeTeam} predictedWinner={predictedWinner}/>
            <GameTeam gameData={gameData} teamName={gameData.homeTeam} predictedWinner={predictedWinner} isSendingPrediction={isSendingPrediction} eligibleTeams = {eligibleTeams} homeVsRoad={'homeTeam'} userMonth={userMonth} activeMonth={activeMonth} addPrediction={addPrediction} removePrediction={removePrediction}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default api;