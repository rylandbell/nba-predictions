'use strict';

import { connect } from 'react-redux';
import ActionCreator from '../../action-creators.js';

import PredictionsSummary from '../monthly-picks/predictions-summary/predictions-summary.jsx';

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

const api = connect(
  mapStateToProps,
  mapDispatchToProps
)(PredictionsSummary);

export default api;