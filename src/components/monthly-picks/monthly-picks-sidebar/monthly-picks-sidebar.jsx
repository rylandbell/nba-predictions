import { connect } from 'react-redux';
import React from "react";

import MonthlyPicksSidebarRow from "./monthly-picks-sidebar-row.jsx";
import ActionCreator from '../../../actions/action-creators.js';
import { getActiveUserMonth } from '../../../selectors/userMonth.js';

const mapStateToProps = (state) => ({
  predictedWinners: getActiveUserMonth(state).predictedWinners,
  activeDate: state.dates.activeDate,
  activeMonth: state.dates.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  updateActiveDate: (newDate) => {
    dispatch(ActionCreator.setActiveDate (newDate));
  }
});

const MonthlyPicksSidebar = ({
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

const MonthlyPicksSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicksSidebar);

export default MonthlyPicksSidebarContainer;
