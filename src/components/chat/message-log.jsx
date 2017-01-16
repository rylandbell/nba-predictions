'use strict';

import React from 'react';

import Helper from '../../helper.js';
import MessageRow from './message-row.jsx';

//creates array of MessageRows
const MessageLog = React.createClass({
  componentDidUpdate: Helper.scrollToBottom,
  componentDidMount: Helper.scrollToBottom,
  render: function() {
    return (
      <div ref={(c) => this.log = c}>
        {this.props.messages.map((message,index) => <MessageRow message={message} key={index}/>)}
      </div> 
    );
  }
});

export default MessageLog;