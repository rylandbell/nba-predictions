'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ChatWall from '../chat/chat-wall.jsx';
import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';


const mapStateToProps = (state) => ({
  messages: state.messages,
  enteredText: state.enteredText,
  isFetchingMessageLog: state.isFetchingMessageLog
});

const mapDispatchToProps = (dispatch) => ({
  getMessageLog:
    () => {
      Helper.myFetch(
        '/api/messages',
        'GET',
        {},
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
      dispatch(ActionCreator.requestMessageLogWaiting());
    },
  handleTextChange:
    (e) => {
      e.preventDefault();
      dispatch(ActionCreator.textEntry(e.target.value));
    },
  sendMessage:
    (enteredText) => {
      if(enteredText === ''){
        return;
      } else {
        dispatch(ActionCreator.sendMessage());
        Helper.myFetch(
          '/api/messages',
          'PUT',
          Helper.addMessageProps(enteredText),
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
      if(e.charCode===13){
        e.preventDefault();
        $('.new-message-form input[type="submit"]').click();
      }
    }
});

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWall);

export default ChatContainer;