import React from "react";

import MonthlyPicksSidebarRow from "./monthly-picks-sidebar-row.jsx";

const MonthlyPicksSummary = ({
  predictedWinners,
  activeDate,
  activeMonth,
  updateActiveDate
}) => {
  const daysInMonth = moment(activeMonth).daysInMonth();

  const rows = [];
  for (var i = 1; i <= daysInMonth; i++) {
    rows.push(
      <MonthlyPicksSidebarRow
        userPrediction={predictedWinners[i]}
        activeDate={activeDate}
        activeMonth={activeMonth}
        updateActiveDate={updateActiveDate}
        dayOfMonth={i}
        key={i}
      />
    );
  }

  return (
    <div className="panel panel-default panel-black monthly-picks-sidebar-panel">
      <div className="panel-heading">
        <div className="panel-title">
          My {moment(activeMonth).format("MMMM")} Picks
        </div>
      </div>
      <div className="panel-body">
        <table className="table table-condensed table-hover monthly-picks-sidebar">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyPicksSummary;
