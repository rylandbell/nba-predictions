'use strict';

import { connect } from 'react-redux';

import {requestUserMonthData, requestGameData, requestStandingsData} from '../../actions/api-get.js';
import ActionCreator from '../../actions/action-creators.js';
import LeagueMonthPicker from '../league-month-picker/league-month-picker.jsx';

const mapStateToProps = state => ({
  activeMonth: state.activeMonth,
  currentMonth: state.currentMonth
});

const mapDispatchToProps = dispatch => ({
  getStandingsData: (month) => {
    dispatch(requestStandingsData(month))
  },
  getUserMonthData: (month) => {
    dispatch(requestUserMonthData(month));
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