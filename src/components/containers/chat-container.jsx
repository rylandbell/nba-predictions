'use strict';

import { connect } from 'react-redux';

import ChatWall from '../chat/chat-wall.jsx';
import {requestMessageLog} from '../../actions/api-get.js';
import {sendMessage} from '../../actions/api-put.js';
import ActionCreator from '../../actions/action-creators.js';

const mapStateToProps = (state) => ({
  messages: state.apiData.messages,
  activeLeagueId: state.activeLeagueId,
  enteredChatText: state.ui.enteredChatText,
  isFetchingMessageLog: state.fetchStatus.isFetchingMessageLog
});

const mapDispatchToProps = (dispatch) => ({
  getMessageLog: (leagueId) => {
    dispatch(requestMessageLog(leagueId));
  },
  sendMessage: (enteredChatText, leagueId) => {
    if(enteredChatText === ''){
      return;
    } else {
      dispatch(sendMessage(enteredChatText, leagueId));
    }
  },
  handleTextChange: (e) => {
    e.preventDefault();
    dispatch(ActionCreator.chatTextEntry(e.target.value));
  },
  listenForEnter: (e) => {
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