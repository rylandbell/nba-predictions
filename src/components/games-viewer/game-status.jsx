'use strict';

import React from 'react';

const api = ({statusData, roadTeam, homeTeam, predictedWinner}) => {
  var scoreString;
  var progressString;
  var outcomeString = '';
  var outcomeClass = '';

  //set scoreString to game score or start time
  if(statusData.hasStarted){
    scoreString = statusData.roadScore + ' - ' + statusData.homeScore;
  } else {
    scoreString = statusData.startTime;
  }

  // set progressString to Final or In Progress (maybe eventually better precision than In Progress)
  if(statusData.hasStarted){
    if(statusData.isFinal) {
      progressString = 'Final';
    } else {
      progressString = 'In Progress';
    }
  }

  // set outcomeString to display "success" or "failure" appropriately
  if(predictedWinner.teamName === homeTeam || predictedWinner.teamName === roadTeam){
    if(predictedWinner.outcome === 'success'){
      outcomeString = 'W';
      outcomeClass = 'text-success';
    } else if (predictedWinner.outcome === 'failure'){
      outcomeString = 'L';
      outcomeClass = 'text-danger';
    }
  }

  return (
    <div className="game-item game-status">
      <h5 className="game-status-score">{scoreString}</h5>
      <small className="game-status-progress">{progressString}</small>
      <h3 className={"game-status-outcome " + outcomeClass}>{outcomeString}</h3>
    </div>
  );
};

export default api;