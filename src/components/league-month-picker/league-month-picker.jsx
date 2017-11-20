import React from "react";

import MonthSelect from "./month-select.jsx";
import LeagueSelect from "./league-select.jsx";

const LeagueMonthPicker = ({
  user,
  activeLeagueId,
  activeMonth,
  setActiveLeague,
  currentMonth,
  setActiveMonth,
  availableMonths
}) => {
  let panelContent;

  //Display nothing if no leagues joined, waiting message if no user data, and picker component otherwise
  if (user && user.leagues) {
    if (user.leagues.length < 1) {
      panelContent = null;
    } else {
      panelContent = (
        <form className="navbar-form navbar-left league-month-picker">
          <div className="form-group">
            <LeagueSelect
              user={user}
              activeLeagueId={activeLeagueId}
              activeMonth={activeMonth}
              setActiveLeague={setActiveLeague}
            />
          </div>
          <div className="form-group">
            <MonthSelect
              activeMonth={activeMonth}
              currentMonth={currentMonth}
              activeLeagueId={activeLeagueId}
              setActiveMonth={setActiveMonth}
              availableMonths={availableMonths}
            />
          </div>
        </form>
      );
    }
  } else {
    panelContent = null;
  }

  return panelContent;
};

export default LeagueMonthPicker;
