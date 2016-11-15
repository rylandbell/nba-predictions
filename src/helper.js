'use strict';

import fetch from 'isomorphic-fetch';



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

  parseDateFromPath: function(path) {
    return path
      .split('/')
      .slice(-2);
  },

  //returns the browser's current path, minus the last step
  //e.g. sample.com/a/b/c should return '/a/b/'
  getPathDirectory: function() {
    const pathnameArray = window.location.pathname.split('/');
    pathnameArray.pop();
    return pathnameArray.join('/')+'/';
  }
};

export default api;