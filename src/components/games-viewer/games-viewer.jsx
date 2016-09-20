'use strict';

import React from 'react';

import SingleDayGameList from './single-day-game-list.jsx';
import DayPicker from './day-picker.jsx';

const api = ({selectedDate, gamesByDay, eligibleTeams, predictedWinners, addPrediction, removePrediction, dayForward, dayBack}) => (
  <div className="col-xs-9 col-sm-8 col-md-9 col-sm-offset-1 col-md-offset-1">
    <DayPicker selectedDate={selectedDate} dayForward={dayForward} dayBack={dayBack} />
    <SingleDayGameList gamesByDay={gamesByDay} eligibleTeams={eligibleTeams} predictedWinners={predictedWinners} selectedDate={selectedDate} addPrediction={addPrediction} removePrediction={removePrediction} />
  </div>
);

export default api;