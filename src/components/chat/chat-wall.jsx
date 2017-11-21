import { connect } from 'react-redux';
import React, { Component } from "react";

import {requestMessageLog} from '../../actions/api-get.js';
import {sendMessage} from '../../actions/api-put.js';
import ActionCreator from '../../actions/action-creators.js';
import MessageLog from "./message-log.jsx";
import NewMessageInput from "./new-message-input.jsx";
import StatusMessage from "../status-message.jsx";

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

class ChatWall extends Component {
  componentDidMount() {
    this.props.getMessageLog(this.props.activeLeagueId);
  }
  render() {
    return (
      <div className="chat panel panel-default panel-black">
        <div className="panel-heading hidden-xs chat__heading">
          <div className="panel-title">Chat Wall</div>
        </div>
        <div className="panel-body chat__body">
          <NewMessageInput
            enteredChatText={this.props.enteredChatText}
            activeLeagueId={this.props.activeLeagueId}
            sendMessage={this.props.sendMessage}
            handleTextChange={this.props.handleTextChange}
            listenForEnter={this.props.listenForEnter}
          />
          <div className="chat__message-log">
            <div>
              {this.props.isFetchingMessageLog
                ? <StatusMessage
                    messageBold={"Loading message data..."}
                    messageBody={"Just hang tight."}
                    messageClass={"info"}
                  />
                : <MessageLog messages={this.props.messages} />}
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWall);

export default ChatContainer;
