'use strict';

import { connect } from 'react-redux';

import StandingsTable from '../standings/standings-table.jsx';

const mapStateToProps = state => ({
  activeMonth: state.activeMonth,
  currentMonth: state.currentMonth,
  standingsData: state.standingsData,
  isFetchingStandingsData: state.fetchStatus.isFetchingStandingsData
});

const mapDispatchToProps = () => ({
});

const StandingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsTable);

export default StandingsContainer;