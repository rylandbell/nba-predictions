'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ChatWall from '../chat/chat-wall.jsx';
import {requestMessageLog} from '../../actions/action-creators.js';
import ActionCreator from '../../actions/action-creators.js';
import Helper from '../../helper.js';


const mapStateToProps = (state) => ({
  messages: state.messages,
  enteredChatText: state.enteredChatText,
  isFetchingMessageLog: state.fetchStatus.isFetchingMessageLog
});

const mapDispatchToProps = (dispatch) => ({
  getMessageLog: () => {
    dispatch(requestMessageLog());
  },
  handleTextChange:
    (e) => {
      e.preventDefault();
      dispatch(ActionCreator.chatTextEntry(e.target.value));
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

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWall);

export default ChatContainer;