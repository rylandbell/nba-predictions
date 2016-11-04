'use strict';

import React from 'react';

import SingleDayGameList from './single-day-game-list.jsx';
import DayPicker from './day-picker.jsx';

const api = ({activeDate, gamesByDay, eligibleTeams, isSendingPrediction, predictedWinners, addPrediction, removePrediction, dayForward, dayBack}) => (
  <div className="col-xs-12 col-sm-8 col-md-9">
    <DayPicker activeDate={activeDate} dayForward={dayForward} dayBack={dayBack} />
    <p className="text-center day-picker-message">
      (Home teams are displayed on the right.)
    </p>
    <SingleDayGameList gamesByDay={gamesByDay} eligibleTeams={eligibleTeams} isSendingPrediction={isSendingPrediction} predictedWinners={predictedWinners} activeDate={activeDate} addPrediction={addPrediction} removePrediction={removePrediction} />
  </div>
);

export default api;