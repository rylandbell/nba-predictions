import React from "react";

import MessageRow from "./message-row.jsx";

//creates array of MessageRows
const MessageLog = ({ messages }) =>
  <div>
    {messages.map((message, index) =>
      <MessageRow message={message} key={index} />
    )}
  </div>;

export default MessageLog;
