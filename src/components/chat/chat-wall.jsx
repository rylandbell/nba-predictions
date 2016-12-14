'use strict';

import React from 'react';

import MessageLog from './message-log.jsx';
import NewMessageInput from './new-message-input.jsx';

//owns message array state, assembles subcomponents: 
const ChatWall = ({messages, enteredText, sendMessage, handleTextChange, listenForEnter}) => (
  <div className="panel panel-default panel-transparent">
    {/*<div className="panel-heading">
      <div className="panel-title">Chat</div>
    </div>*/}
    <div className="panel-body conversation-panel">
      <MessageLog messages={messages}/>
      <div className="clearfix"></div>
    </div>

    <div className="panel-footer"> 
      <NewMessageInput 
        enteredText={enteredText} 
        sendMessage={sendMessage} 
        handleTextChange = {handleTextChange}
        listenForEnter = {listenForEnter}
      />
    </div>
  </div>
);
  
export default ChatWall;