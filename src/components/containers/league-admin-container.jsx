'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import LeagueAdmin from '../league-admin/league-admin.jsx';
import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';

const mapStateToProps = (state) => ({
  enteredLeagueName: state.enteredLeagueName,
  enteredLeagueId: state.enteredLeagueId
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
  sendMessage:
    (enteredChatText) => {
      if(enteredChatText === ''){
        return;
      } else {
        dispatch(ActionCreator.sendMessage());
        Helper.myFetch(
          '/api/messages',
          'PUT',
          Helper.addMessageProps(enteredChatText),
          (response => {
            dispatch(ActionCreator.receiveMessageLog(response));
          }),
          (response => {
            if (response.message === "No messageLog found") {
              dispatch(ActionCreator.requestMessageLogFailure(response.message));
            } else {
              Alert.warning('Error: Failed to load message log. ' + response.message,
                {
                  position: 'bottom',
                  effect: 'stackslide',
                  beep: false,
                  timeout: 8000,
                  offset: 0
                }
              );
            }
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