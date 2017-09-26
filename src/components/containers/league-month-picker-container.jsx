'use strict';

import { connect } from 'react-redux';

import {requestUserMonthData, requestGameData, requestStandingsData} from '../../actions/api-get.js';
import ActionCreator from '../../actions/action-creators.js';
import LeagueMonthPicker from '../league-month-picker/league-month-picker.jsx';

const mapStateToProps = state => ({
  user: state.user,
  activeLeagueId: state.activeLeagueId,
  activeMonth: state.activeMonth,
  currentMonth: state.currentMonth,
  isFetchingUserData: state.fetchStatus.isFetchingUserData
});

const mapDispatchToProps = dispatch => ({
  getStandingsData: (month, leagueId) => {
    dispatch(requestStandingsData(month, leagueId))
  },
  getUserMonthData: (month, leagueId) => {
    dispatch(requestUserMonthData(month, leagueId));
  },
  getGameData: (month) => {
    dispatch(requestGameData(month));
  },
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