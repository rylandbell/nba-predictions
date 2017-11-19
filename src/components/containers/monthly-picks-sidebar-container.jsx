'use strict';

import { connect } from 'react-redux';
import ActionCreator from '../../actions/action-creators.js';

import MonthlyPicksSidebar from '../monthly-picks/monthly-picks-sidebar/monthly-picks-sidebar.jsx';
import { getActiveUserMonth } from '../../selectors/userMonth.js';

const mapStateToProps = (state) => ({
  predictedWinners: getActiveUserMonth(state).predictedWinners,
  activeDate: state.activeDate,
  activeMonth: state.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  updateActiveDate: (newDate) => {
    dispatch(ActionCreator.setActiveDate (newDate));
  }
});

const MonthlyPicksSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicksSidebar);

export default MonthlyPicksSidebarContainer;