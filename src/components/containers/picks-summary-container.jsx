'use strict';

import { connect } from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';

import {requestUserMonthData} from '../../actions/api-get.js';
import {createUserMonth} from '../../actions/api-post.js';
import ActionCreator from '../../actions/action-creators.js';
import PicksSummary from '../picks-summary/picks-summary.jsx';

const mapStateToProps = state => ({
  missingUserMonth: state.fetchStatus.missingUserMonth,
  userMonth: state.userMonth,
  activeMonth: state.activeMonth,
  currentMonth: state.currentMonth,
  currentDate: state.currentDate
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth) => {
    dispatch(createUserMonth(activeMonth));
  },
  getUserMonthData: (month) => {
    dispatch(requestUserMonthData(month));
  },
  setActiveMonth: (month) => {
    dispatch(ActionCreator.setActiveMonth(month));
  },
  goToDate: (date) => {
    dispatch(ActionCreator.setActiveDate(date));
    
    const month = date.substring(0,7);
    const path = `/picks/${month}`;
    browserHistory.push(path);
  }
});

const PicksSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksSummary);

export default PicksSummaryContainer;