'use strict';

import React from 'react';
import { Link } from 'react-router';

const api = ({activeDate}) => {
  const prevDay = moment(activeDate).subtract(1,'days').format('D');
  const nextDay = moment(activeDate).add(1,'days').format('D');

  const isFirstOfMonth = moment(activeDate).format('D') === '1';
  const isLastOfMonth = moment(activeDate).format('M') !== moment(activeDate).add(1,'days').format('M');
  return (
    <div className="row">
      <div className="day-picker-container">
        {isFirstOfMonth ? null :
          <Link to={prevDay}>
            <span className="day-picker-item glyphicon glyphicon-menu-left"></span>
          </Link>
        }
        <div className="day-picker-item date-display">
          <h3>
            {moment(activeDate).format('dddd, MMM D')}
          </h3>
        </div>
        
        {isLastOfMonth ? null :
          <Link to={nextDay}>
            <span className="day-picker-item glyphicon glyphicon-menu-right"></span>
          </Link>
        }
      </div>
    </div>
  );
};

export default api;