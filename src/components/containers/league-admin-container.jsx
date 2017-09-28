'use strict';

import { connect } from 'react-redux';

import LeagueAdmin from '../league-admin/league-admin.jsx';
import ActionCreator from '../../actions/action-creators.js';
import {createLeague, joinLeague} from '../../actions/api-post.js';

const mapStateToProps = (state) => ({
  noLeaguesJoined: state.noLeaguesJoined,
  enteredLeagueName: state.enteredLeagueName,
  enteredLeagueId: state.enteredLeagueId,
  isSendingCreateLeague: state.fetchStatus.isSendingCreateLeague,
  isSendingJoinLeague: state.fetchStatus.isSendingJoinLeague,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  handleLeagueNameTextChange: (text) => {
    dispatch(ActionCreator.leagueNameEntry(text));
  },
  handleLeagueIdTextChange: (text) => {
    dispatch(ActionCreator.leagueIdEntry(text));
  },
  listenForEnter: (e) => {
    if(e.charCode === 13){
      e.preventDefault();
      $('.chat__form input[type="submit"]').click();
    }
  },
  sendCreateLeague: (name) => {
    if(name === ''){
      return;
    } else {
      dispatch(createLeague(name));
    }
  },
  sendJoinLeague: (leagueId) => {
    if(leagueId === ''){
      return;
    } else {
      dispatch(joinLeague(leagueId));
    }
  }
});

const LeagueAdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueAdmin);

export default LeagueAdminContainer;