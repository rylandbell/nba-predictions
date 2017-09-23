'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../actions/action-creators.js';
import {createUserMonth} from '../../actions/api-post.js';
import MonthlyPicks from '../monthly-picks/monthly-picks.jsx';

const mapStateToProps = state => ({
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth) => {
    dispatch(createUserMonth(activeMonth));
  },
  showAlert: (type, msg, options) => {
    const defaultOptions = {
      position: 'top',
      effect: 'stackslide',
      beep: false,
      timeout: 8000,
      offset: 0
    };
    options = Object.assign({}, defaultOptions, options);
    Alert[type](msg, options);
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
  }
});

const MonthlyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicks);

export default MonthlyPicksContainer;