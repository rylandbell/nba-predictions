'use strict';

import { connect } from 'react-redux';

import StandingsTable from '../standings/standings-table.jsx';

const mapStateToProps = state => ({
  standingsData: state.standingsData,
  isFetchingStandingsData: state.isFetchingStandingsData
});

const StandingsContainer = connect(
  mapStateToProps
)(StandingsTable);

export default StandingsContainer;