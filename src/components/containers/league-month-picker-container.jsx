'use strict';

import { connect } from 'react-redux';

import ActionCreator from '../../actions/action-creators.js';
import LeagueMonthPicker from '../league-month-picker/league-month-picker.jsx';
import { getAvailableMonths } from '../../selectors/availableMonths.js';

const mapStateToProps = state => ({
  user: state.user,
  noLeaguesJoined: state.noLeaguesJoined,
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

const LeagueMonthPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueMonthPicker);

export default LeagueMonthPickerContainer;