'use strict';

import React from 'react';

import PredictionsSummaryRow from './predictions-summary-row.jsx';

const api = ({predictedWinners, visibleDate, activeMonth, goToDate}) => {
  const daysInMonth = moment(activeMonth).daysInMonth();
  
  const rows = [];
  for (var i = 1; i<=daysInMonth; i++){
    rows.push(
      <PredictionsSummaryRow userPrediction={predictedWinners[i]} visibleDate={visibleDate} activeMonth={activeMonth} goToDate={goToDate} dayOfMonth={i} key={i}/>
    )
  }

  return  (
    <div className="col-xs-12 col-sm-3 col-md-2 col-sm-offset-1 col-md-offset-1">
      <div className="text-center lead">
        Predictions Summary
      </div>
      <table className="table table-condensed table-hover predictions-summary">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default api;

// {eligibleTeams.map((team, index) => <PredictionsSummaryRow predictedWinners={predictedWinners} date={index} key={index}/>)}