'use strict';

import { connect } from 'react-redux';
// import Alert from 'react-s-alert';

import FullStandingsPage from '../full-standings/full-standings-page.jsx';
import {requestStandingsData} from '../../actions/action-creators.js';

const mapStateToProps = state => ({
  activeMonth: state.activeMonth,
  standingsData: state.standingsData,
  isFetchingStandingsData: state.fetchStatus.isFetchingStandingsData
});

const mapDispatchToProps = dispatch => ({
  getStandingsData: (month) => {
    dispatch(requestStandingsData(month))
  }
});

const FullStandingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullStandingsPage);

export default FullStandingsPageContainer;