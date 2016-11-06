'use strict';

import React from 'react';

import SingleDayGameList from './single-day-game-list.jsx';
import DayPicker from './day-picker.jsx';

const DailyPicks = ({activeDate, gamesByDay, eligibleTeams, isSendingPrediction, predictedWinners, userMonth, activeMonth, addPrediction, removePrediction}) => (
  <div className="col-xs-12 col-sm-8 col-md-9">
    <DayPicker activeDate={activeDate} />
    <p className="text-center day-picker-message">
      (Home teams are displayed on the right.)
    </p>
    <SingleDayGameList gamesByDay={gamesByDay} eligibleTeams={eligibleTeams} isSendingPrediction={isSendingPrediction} predictedWinners={predictedWinners} activeDate={activeDate} userMonth={userMonth} activeMonth={activeMonth} addPrediction={addPrediction} removePrediction={removePrediction} />
  </div>
);

export default DailyPicks;