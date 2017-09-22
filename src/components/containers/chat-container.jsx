'use strict';

import { connect } from 'react-redux';

import ChatWall from '../chat/chat-wall.jsx';
import {requestMessageLog} from '../../actions/api-get.js';
import {sendMessage} from '../../actions/api-put.js';
import ActionCreator from '../../actions/action-creators.js';


const mapStateToProps = (state) => ({
  messages: state.messages,
  enteredChatText: state.enteredChatText,
  isFetchingMessageLog: state.fetchStatus.isFetchingMessageLog
});

const mapDispatchToProps = (dispatch) => ({
  getMessageLog: () => {
    dispatch(requestMessageLog());
  },
  sendMessage: (enteredChatText) => {
    if(enteredChatText === ''){
      return;
    } else {
      dispatch(sendMessage(enteredChatText));
    }
  },
  handleTextChange:
    (e) => {
      e.preventDefault();
      dispatch(ActionCreator.chatTextEntry(e.target.value));
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