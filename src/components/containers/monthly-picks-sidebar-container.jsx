'use strict';

import { connect } from 'react-redux';
import ActionCreator from '../../action-creators.js';

import MonthlyPicksSidebar from '../monthly-picks/monthly-picks-sidebar/monthly-picks-sidebar.jsx';

const mapStateToProps = (state) => ({
  predictedWinners: state.userMonth.predictedWinners,
  activeDate: state.activeDate,
  activeMonth: state.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  goToDate: (date) => {
    dispatch(ActionCreator.goToDate(date));
  }
});

const MonthlyPicksSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicksSidebar);

export default MonthlyPicksSidebarContainer;