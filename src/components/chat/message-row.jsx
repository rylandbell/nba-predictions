import React from "react";

import MessageContentBox from "./message-content-box.jsx";

//assembles message display from date, sender, content
const MessageRow = ({ message }) =>
  <div className="chat__message-row">
    <div>
      <div className="chat__message-author">
        {message.sender}
        <span className="chat__message-time">
          &nbsp;&middot;&nbsp;{moment(message.timeSent).fromNow()}
        </span>
      </div>
      <MessageContentBox content={message.content} />
    </div>
  </div>;

export default MessageRow;
