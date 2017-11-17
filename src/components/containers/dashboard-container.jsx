'use strict';

import { connect } from 'react-redux';

import Dashboard from '../dashboard/dashboard-page.jsx';

const mapStateToProps = state => ({
  showDashboardTour: state.showDashboardTour
});

const mapDispatchToProps = () => ({
});

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;