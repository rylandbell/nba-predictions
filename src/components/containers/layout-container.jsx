'use strict';

import { connect } from 'react-redux';

import {requestUserData, requestStandingsData, requestUserMonthData} from '../../actions/action-creators.js';
import Layout from '../layout.jsx';

const mapStateToProps = state => ({
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  getStandingsData: (month) => {
    dispatch(requestStandingsData(month))
  },
  getUserMonthData: (month) => {
    dispatch(requestUserMonthData(month));
  },
  getUserData: () => {
    dispatch(requestUserData());
  }
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;