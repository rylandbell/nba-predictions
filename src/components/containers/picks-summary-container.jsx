'use strict';

import { connect } from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';

import {createUserMonth} from '../../actions/api-post.js';
import ActionCreator from '../../actions/action-creators.js';
import PicksSummary from '../picks-summary/picks-summary.jsx';
import { getActiveUserMonth } from '../../selectors/userMonth.js';
import { checkMissingUserMonth } from '../../selectors/missingUserMonth.js';

const mapStateToProps = state => ({
  missingUserMonth: checkMissingUserMonth(state),
  activeUserMonth: getActiveUserMonth(state),
  activeMonth: state.dates.activeMonth,
  activeLeagueId: state.activeLeagueId,
  currentMonth: state.dates.currentMonth,
  currentDate: state.dates.currentDate,
  showDashboardTour: state.ui.showDashboardTour
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