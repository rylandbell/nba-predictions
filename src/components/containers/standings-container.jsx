'use strict';

import { connect } from 'react-redux';

import StandingsTable from '../standings/standings-table.jsx';

const mapStateToProps = state => ({
  activeMonth: state.dates.activeMonth,
  currentMonth: state.dates.currentMonth,
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