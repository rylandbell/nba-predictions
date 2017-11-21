import { connect } from 'react-redux';
import React from "react";

import MonthSelect from "./month-select.jsx";
import LeagueSelect from "./league-select.jsx";
import ActionCreator from '../../actions/action-creators.js';
import { getAvailableMonths } from '../../selectors/availableMonths.js';
import { checkNoLeaguesJoined } from '../../selectors/noLeaguesJoined.js';

const mapStateToProps = state => ({
  user: state.apiData.user,
  noLeaguesJoined: checkNoLeaguesJoined(state),
  activeLeagueId: state.activeLeagueId,
  activeMonth: state.dates.activeMonth,
  currentMonth: state.dates.currentMonth,
  isFetchingUserData: state.fetchStatus.isFetchingUserData,
  availableMonths: getAvailableMonths(state)
});

const mapDispatchToProps = dispatch => ({
  setActiveLeague: (league) => {
    dispatch(ActionCreator.setActiveLeague(league));
  },
  setActiveMonth: (month) => {
    dispatch(ActionCreator.setActiveMonth(month));
  }
});

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

const LeagueMonthPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueMonthPicker);

export default LeagueMonthPickerContainer;
