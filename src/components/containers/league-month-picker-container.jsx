'use strict';

import { connect } from 'react-redux';

import ActionCreator from '../../actions/action-creators.js';
import LeagueMonthPicker from '../league-month-picker/league-month-picker.jsx';

const mapStateToProps = state => ({
  user: state.user,
  noLeaguesJoined: state.noLeaguesJoined,
  activeLeagueId: state.activeLeagueId,
  activeMonth: state.activeMonth,
  currentMonth: state.currentMonth,
  isFetchingUserData: state.fetchStatus.isFetchingUserData
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