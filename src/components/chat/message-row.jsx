'use strict';

import React from 'react';
import moment from 'moment';

import MessageContentBox from './message-content-box.jsx';

//assembles message display from date,  sender, content
const api = ({message, correspondent}) => (
  <div className="message-row">
    <div>
      <div className="message-author pull-left">{message.sender}</div>
      <div className="pull-right">
        <div className="message-time small text-right">{moment(message.timeSent).format('MMM D, h:mm A')}</div>
      </div>
      <div className="clearfix"></div>
      <MessageContentBox content={message.content} />
    </div>
  </div>
);

export default api;