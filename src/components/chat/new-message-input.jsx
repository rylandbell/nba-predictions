'use strict';

import React from 'react';

const NewMessageInput = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.sendMessage(this.props.enteredText);
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea placeholder="What's on your mind?" className="chat__new-message-input form-control" rows='4' value={this.props.enteredText} onChange={this.props.handleTextChange} onKeyPress={this.props.listenForEnter}/>
        <input className='btn btn-primary hidden' type='submit' value='Send' />
        <div className="small pull-right chat__help-text">Press enter to send</div>
        <div className="clearfix"></div>
      </form>
    )
  }
});

export default NewMessageInput;