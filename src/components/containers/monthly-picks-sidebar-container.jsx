'use strict';

import { connect } from 'react-redux';
import ActionCreator from '../../actions/action-creators.js';

import MonthlyPicksSidebar from '../monthly-picks/monthly-picks-sidebar/monthly-picks-sidebar.jsx';

const mapStateToProps = (state) => ({
  predictedWinners: state.userMonth.predictedWinners,
  activeDate: state.activeDate,
  activeMonth: state.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  updateActiveDate: (activeMonth, newDay) => {
    dispatch(ActionCreator.setActiveDate (activeMonth, newDay));
  }
});

const MonthlyPicksSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicksSidebar);

export default MonthlyPicksSidebarContainer;