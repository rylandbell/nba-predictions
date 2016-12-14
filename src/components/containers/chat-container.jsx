'use strict';

import { connect } from 'react-redux';

import ChatWall from '../chat/chat-wall.jsx';
import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';


const mapStateToProps = (state) => ({
  messages: state.messages,
  enteredText: state.enteredText
});

const mapDispatchToProps = (dispatch) => ({
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
        dispatch(ActionCreator.sendMessage(Helper.addMessageProps(enteredText)));
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