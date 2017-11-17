'use strict';

import { connect } from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';

import {createUserMonth} from '../../actions/api-post.js';
import ActionCreator from '../../actions/action-creators.js';
import PicksSummary from '../picks-summary/picks-summary.jsx';

const mapStateToProps = state => ({
  missingUserMonth: state.fetchStatus.missingUserMonth,
  userMonth: state.userMonth,
  activeMonth: state.activeMonth,
  activeLeagueId: state.activeLeagueId,
  currentMonth: state.currentMonth,
  currentDate: state.currentDate,
  showingTours: state.showingTours
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth, leagueId) => {
    dispatch(createUserMonth(activeMonth, leagueId));
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