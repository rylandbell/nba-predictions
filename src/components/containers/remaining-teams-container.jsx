'use strict';

import { connect } from 'react-redux';

// import ActionCreator from '../../action-creators.jsx';
import RemainingTeamsTable from '../remaining-teams-table/remaining-teams-table.jsx'; 

const mapStateToProps = (state) => ({
  eligibleTeams: state.userMonth.eligibleTeams
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dummy: () => {
    ownProps;
  }
});

const api = connect(
  mapStateToProps,
  mapDispatchToProps
)(RemainingTeamsTable);

export default api;