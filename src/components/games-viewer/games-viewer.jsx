'use strict';

import React from 'react';

import SingleDayGameList from './single-day-game-list.jsx';
import DayPicker from './day-picker.jsx';

const api = ({visibleDate, gamesByDay, eligibleTeams, isSendingPrediction, predictedWinners, addPrediction, removePrediction, dayForward, dayBack}) => (
  <div className="col-xs-9 col-sm-8 col-md-9">
    <DayPicker visibleDate={visibleDate} dayForward={dayForward} dayBack={dayBack} />
    <SingleDayGameList gamesByDay={gamesByDay} eligibleTeams={eligibleTeams} isSendingPrediction={isSendingPrediction} predictedWinners={predictedWinners} visibleDate={visibleDate} addPrediction={addPrediction} removePrediction={removePrediction} />
  </div>
);

export default api;