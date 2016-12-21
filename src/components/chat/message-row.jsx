'use strict';

import React from 'react';
import moment from 'moment';

import MessageContentBox from './message-content-box.jsx';

//assembles message display from date,  sender, content
const api = ({message}) => (
  <div className="message-row">
    <div>
      <h6 className="message-author">{message.sender}
        <span className="message-time">&nbsp;&middot;&nbsp;{moment(message.timeSent).fromNow()}</span>
      </h6>
      {/*<div className="pull-right">
        <div className="message-time small text-right">{moment(message.timeSent).fromNow()}</div>
      </div>
      <div className="clearfix"></div>*/}
      <MessageContentBox content={message.content} />
    </div>
  </div>
);

export default api;