'use strict';

import React from 'react';

import SingleGame from './single-game.jsx';

const api = ({selectedDate, gamesByDay, predictedWinners, eligibleTeams, addPrediction, removePrediction}) => {

  //subtract 1 to go from day-of-month to zero-indexed array position:
  const dayKey = moment(selectedDate).format('D')-1;
  return (
    <div className="row">
      {gamesByDay[dayKey].map(
        (gameData, index) =>
          <SingleGame gameData={gameData} predictedWinner={predictedWinners[dayKey+1]} eligibleTeams = {eligibleTeams} addPrediction={addPrediction} removePrediction={removePrediction} key={index} />
        )
      }
    </div>
  );
};

export default api;