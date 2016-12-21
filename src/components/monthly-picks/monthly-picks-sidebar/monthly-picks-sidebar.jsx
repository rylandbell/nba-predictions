'use strict';

import React from 'react';
import moment from 'moment';

import MonthlyPicksSidebarRow from './monthly-picks-sidebar-row.jsx';

const MonthlyPicksSummary = ({predictedWinners, activeDate, activeMonth, goToDate}) => {
  const daysInMonth = moment(activeMonth).daysInMonth();
  
  const rows = [];
  for (var i = 1; i<=daysInMonth; i++){
    rows.push(
      <MonthlyPicksSidebarRow userPrediction={predictedWinners[i]} activeDate={activeDate} activeMonth={activeMonth} goToDate={goToDate} dayOfMonth={i} key={i}/>
    )
  }

  return  (
    <div className="col-xs-12 col-sm-4 col-md-3">
      <div className="panel panel-default panel-black monthly-picks-sidebar-panel">
        <div className="panel-heading">
          <div className="panel-title">My {moment(activeMonth).format('MMMM')} Picks</div>
        </div>
        <div className="panel-body">
          <table className="table table-condensed table-hover monthly-picks-sidebar">
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MonthlyPicksSummary;

// {eligibleTeams.map((team, index) => <MonthlyPicksSidebarRow predictedWinners={predictedWinners} date={index} key={index}/>)}