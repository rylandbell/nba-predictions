'use strict';

import React from 'react';

import SingleGame from './single-game.jsx';

const api = ({reduxState, addPrediction, removePrediction}) => {

  //subtract 1 to go from day-of-month to zero-indexed array position:
  const dayKey = moment(reduxState.selectedDate).format('D')-1;
  return (
    <div className="row">
      {reduxState.gamesByDay[dayKey].map(
        (gameData, index) =>
          <SingleGame gameData={gameData} predictedWinner={reduxState.predictedWinners[dayKey+1]} eligibleTeams = {reduxState.eligibleTeams} addPrediction={addPrediction} removePrediction={removePrediction} key={index} />
        )
      }
    </div>
  );
};

export default api;