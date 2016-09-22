'use strict';

import React from 'react';

import SingleGame from './single-game.jsx';

const api = ({visibleDate, gamesByDay, predictedWinners, eligibleTeams, addPrediction, removePrediction}) => {

  //subtract 1 to go from day-of-month to zero-indexed array position:
  const dayKey = moment(visibleDate).format('D')-1;
  return (
    <div className="row">
      {
        (gamesByDay && gamesByDay[dayKey] && gamesByDay[dayKey].gameSummaries.length>0) ?
          gamesByDay[dayKey].gameSummaries.map(
          (gameData, index) =>
            <SingleGame gameData={gameData} predictedWinner={predictedWinners[dayKey+1]} eligibleTeams = {eligibleTeams} addPrediction={addPrediction} removePrediction={removePrediction} key={index} />
          )
        : <div> Sorry, no games scheduled for today. </div>
      }
    </div>
  );
};

export default api;