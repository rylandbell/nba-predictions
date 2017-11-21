import React from 'react';

const api = {
  //takes a date formatted like '2016-11-15' and a time string formatted like '4:30 pm ET';
  getDateTime: function(dateString, timeString) {
    return moment(dateString + ' ' + timeString, 'YYYY-MM-DD h:mm a').format();
  },

  //returns the browser's current path, minus the last step
  //e.g. sample.com/a/b/c should return '/a/b/'
  getPathDirectory: function() {
    const pathnameArray = window.location.pathname.split('/');
    pathnameArray.pop();
    return pathnameArray.join('/')+'/';
  },

  // ~~~~~~Chat component helpers:~~~~~~

  //Convert user-entered string to a message object:
  addMessageProps: function (enteredChatText){
    const fullMessage = {
      timeSent: new Date().toISOString(),
      content: enteredChatText
    };
    return fullMessage;
  },

  //handles paragraph formatting for displayed messages
  formatMessage: function (message) {
    const paragraphArray = message.split('\n');
    const formattedMessage = [];
    paragraphArray.forEach(function(paragraph, index){
      formattedMessage.push(
        <div className='message-paragraph' key={index}>{paragraph}</div>
      );
    });
    return formattedMessage;
  }
};

export default api;