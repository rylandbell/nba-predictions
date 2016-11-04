'use strict';

import React from 'react';

const api = ({activeDate, dayForward, dayBack}) => (
  <div className="row">
    <div className="day-picker-container">
      <span onClick={dayBack} className="day-picker-item glyphicon glyphicon-menu-left"></span>
      <div className="day-picker-item date-display">
        <h3>
          {moment(activeDate).format('dddd, MMM D')}
        </h3>
      </div>
      <span onClick={dayForward} className="day-picker-item glyphicon glyphicon-menu-right"></span>
    </div>
  </div>
);

export default api;