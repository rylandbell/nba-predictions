'use strict';

import React from 'react';

const api = ({statusData}) => {
  var scoreString;
  var progressString;

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

  return (
    <div className="game-item game-status">
      <h5 className="game-status-score">{scoreString}</h5>
      <small className="game-status-progress">{progressString}</small>
      <h4 className="text-danger">
        <span className="glyphicon glyphicon-thumbs-down"></span>
      </h4>
    </div>
  );
};

export default api;