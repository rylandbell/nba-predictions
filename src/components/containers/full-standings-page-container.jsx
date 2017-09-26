'use strict';

import { connect } from 'react-redux';

import FullStandingsPage from '../full-standings/full-standings-page.jsx';

const mapStateToProps = state => ({
  activeMonth: state.activeMonth,
  standingsData: state.standingsData,
  isFetchingStandingsData: state.fetchStatus.isFetchingStandingsData
});

const mapDispatchToProps = () => ({
});

const FullStandingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullStandingsPage);

export default FullStandingsPageContainer;