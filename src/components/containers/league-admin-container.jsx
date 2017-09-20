'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import LeagueAdmin from '../league-admin/league-admin.jsx';
import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';

const mapStateToProps = (state) => ({
  enteredLeagueName: state.enteredLeagueName,
  enteredLeagueId: state.enteredLeagueId,
  isSendingCreateLeague: state.fetchStatus.isSendingCreateLeague,
  isSendingJoinLeague: state.fetchStatus.isSendingJoinLeague
});

const mapDispatchToProps = (dispatch) => ({
  handleLeagueNameTextChange:
    (text) => {
      dispatch(ActionCreator.leagueNameEntry(text));
    },
  handleLeagueIdTextChange:
    (text) => {
      dispatch(ActionCreator.leagueIdEntry(text));
    },
  sendCreateLeague:
    (name) => {
      if(name === ''){
        return;
      } else {
        dispatch(ActionCreator.createLeagueWaiting());
        Helper.myFetch(
          '/api/league',
          'POST',
          {name: name},
          (response => {
            dispatch(ActionCreator.createLeagueSuccess());
            console.log(response);
          }),
          (response => {
            dispatch(ActionCreator.createLeagueFailure());
            Alert.warning('Error: Failed to create league. ' + response.message,
              {
                position: 'bottom',
                effect: 'stackslide',
                beep: false,
                timeout: 8000,
                offset: 0
              }
            );
          })
        );
      }
    },
  sendJoinLeague:
    (id) => {
      if(id === ''){
        return;
      } else {
        dispatch(ActionCreator.joinLeagueWaiting());
        Helper.myFetch(
          '/api/league/' + id,
          'POST',
          {},
          (response => {
            dispatch(ActionCreator.joinLeagueSuccess());
            console.log('Successsss', response);
          }),
          (response => {
            dispatch(ActionCreator.joinLeagueFailure());
            Alert.warning('Error: Failed to join league. ' + response.message,
              {
                position: 'bottom',
                effect: 'stackslide',
                beep: false,
                timeout: 8000,
                offset: 0
              }
            );
          })
        );
      }
    },
  listenForEnter:
    (e) => {
      if(e.charCode === 13){
        e.preventDefault();
        $('.chat__form input[type="submit"]').click();
      }
    }
});

const LeagueAdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueAdmin);

export default LeagueAdminContainer;