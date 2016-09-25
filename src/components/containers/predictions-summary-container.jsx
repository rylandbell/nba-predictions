'use strict';

import { connect } from 'react-redux';

import PredictionsSummary from '../predictions-summary/predictions-summary.jsx';

const mapStateToProps = (state) => ({
  predictedWinners: state.userMonth.predictedWinners
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dummy: () => {
    ownProps;
  }
});

const api = connect(
  mapStateToProps,
  mapDispatchToProps
)(PredictionsSummary);

export default api;