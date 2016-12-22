'use strict';

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import React from 'react';

function handleErrors(response) {
  // if (!response.ok) {
  //   // response
  //   //   .json()
  //   //   .then(x => {console.log('gonna throw: '); throw Error(x.message)});
  //   throw Error(response);
  // } else {
  //   return response;
  // }
  if (response.ok) {
    return response;
  } else {
    throw response;
  }
}

const api = {
  myFetch: function(url, method, bodyData, successCallback, failureCallback){

    const newRequest = {
      // mode: 'cors',
      method: method,
      // credentials: 'include',
      credentials: 'same-origin',
      cache: 'default'
    };

    if(method !== 'GET'){
      newRequest.body = JSON.stringify(bodyData);
      newRequest.headers = new Headers;
      newRequest.headers.append('Content-Type', 'application/json');
    }
    
    fetch(url,newRequest)
      .then(response => handleErrors(response))
      .then(response => response.json())
      .then(response => successCallback(response))
      .catch(response => {
        response
          .json()
          .then(response => {failureCallback(response);})
          .catch(err => {console.log('catch block err: ',err);});
      });
  },

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
  //always scroll chat window to bottom when new message sent
  scrollToBottom: function(){
    const node = this.log;
    node.parentNode.scrollTop = node.scrollHeight;
  },

  //Convert user-entered string to a message object:
  addMessageProps: function (enteredText){
    const fullMessage = {
      timeSent: new Date().toISOString(),
      content: enteredText
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