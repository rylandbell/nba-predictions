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
  activeMonth: state.activeMonth
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth) => {
    dispatch(createUserMonth(activeMonth));
  },
  getUserMonthData: (month) => {
    dispatch(requestUserMonthData(month));
  },
  setActiveMonth: (month) => {
    let activeDay;
    // if (month===moment().format('YYYY-MM')) {
    //   activeDay = moment().format('D'); summer mode
    if (month==='2017-04') {
      activeDay = '11';
    } else {
      activeDay = '1';
    }
    dispatch(ActionCreator.setActiveMonth(month));
    dispatch(ActionCreator.setActiveDate(month, activeDay));
  },
  goToDate: (month, day) => {
    dispatch(ActionCreator.setActiveDate(month, day));
    const path = `/picks/${month}`;
    browserHistory.push(path);
  }
});

const PicksSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksSummary);

export default PicksSummaryContainer;