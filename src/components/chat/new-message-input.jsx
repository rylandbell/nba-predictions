'use strict';

import React from 'react';

const NewMessageInput = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.sendMessage(this.props.enteredChatText);
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="chat__form">
        <textarea placeholder="What's on your mind?" className="chat__new-message-input form-control" rows='4' value={this.props.enteredChatText} onChange={this.props.handleTextChange} onKeyPress={this.props.listenForEnter}/>
        <div className="small pull-right chat__help-text">Press enter to send</div>
        <div className="clearfix"></div>
        <input type="submit" className="hidden"></input>
      </form>
    )
  }
});

export default NewMessageInput;