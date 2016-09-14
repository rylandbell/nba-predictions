'use strict';

import React from 'react';

import SingleGame from './single-game.jsx';

const api = ({reduxState, addPrediction, removePrediction}) => (
  <div className="row">
    {reduxState.map(
      (gameData, index) =>
        <SingleGame gameData={gameData} addPrediction={addPrediction} removePrediction={removePrediction} key={index} />
      )
    }
</div>
);

export default api;