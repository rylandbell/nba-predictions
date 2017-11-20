import React from "react";

import Helper from "../../helper.js";

//helper handles paragraph breaks in message text
const api = ({ content }) =>
  <div className="chat__message-content">{Helper.formatMessage(content)}</div>;

export default api;
