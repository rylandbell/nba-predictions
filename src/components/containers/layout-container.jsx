'use strict';

import { connect } from 'react-redux';

import {requestUserData, requestGameData} from '../../actions/api-get.js';
import Layout from '../layout.jsx';

const mapStateToProps = state => ({
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  getUserData: () => {
    dispatch(requestUserData());
  },
  getGameData: (month) => {
    dispatch(requestGameData(month));
  },
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;