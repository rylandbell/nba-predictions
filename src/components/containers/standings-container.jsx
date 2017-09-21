'use strict';

import { connect } from 'react-redux';
// import Alert from 'react-s-alert';

import StandingsTable from '../standings/standings-table.jsx';
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

const StandingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsTable);

export default StandingsContainer;