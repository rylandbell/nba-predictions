'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../actions/action-creators.js';
import {createUserMonth} from '../../actions/api-post.js';
import MonthlyPicks from '../monthly-picks/monthly-picks.jsx';
import { checkMissingUserMonth } from '../../selectors/missingUserMonth.js';
import {runPicksIntro} from '../../intro-tours.js';

const mapStateToProps = state => ({
  reduxState: state,
  missingUserMonth: checkMissingUserMonth(state)
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth, leagueId) => {
    dispatch(createUserMonth(activeMonth, leagueId));
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
    dispatch(ActionCreator.setActiveMonth(month));
  },
  runPicksTour: () => {
    setTimeout(function () {
      runPicksIntro(dispatch);
    }, 500);
  }
});

const MonthlyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicks);

export default MonthlyPicksContainer;