import React from "react";

const StatusMessage = ({ messageBold, messageBody, messageClass }) =>
  <div className={"status-message alert alert-" + messageClass}>
    <strong>
      {messageBold}
    </strong>
    {"\t" + messageBody}
  </div>;

export default StatusMessage;
