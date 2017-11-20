import React, { Component } from "react";

import MessageLog from "./message-log.jsx";
import NewMessageInput from "./new-message-input.jsx";
import StatusMessage from "../status-message.jsx";

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

export default ChatWall;
