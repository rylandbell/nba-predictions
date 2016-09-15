'use strict';

import React from 'react';

import SingleDayGameList from './single-day-game-list.jsx';
import DayPicker from './day-picker.jsx';

const api = ({reduxState, addPrediction, removePrediction, dayForward, dayBack}) => (
  <div>
    <DayPicker reduxState={reduxState} dayForward={dayForward} dayBack={dayBack} />
    <SingleDayGameList reduxState={reduxState} addPrediction={addPrediction} removePrediction={removePrediction} />
  </div>
);

export default api;