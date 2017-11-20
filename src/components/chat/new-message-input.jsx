import React, { Component } from "react";

class NewMessageInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(
      this.props.enteredChatText,
      this.props.activeLeagueId
    );
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="chat__form">
        <textarea
          placeholder="What's on your mind?"
          className="chat__new-message-input form-control"
          rows="4"
          value={this.props.enteredChatText}
          onChange={this.props.handleTextChange}
          onKeyPress={this.props.listenForEnter}
        />
        <div className="small pull-right chat__help-text">
          Press enter to send
        </div>
        <div className="clearfix" />
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default NewMessageInput;
