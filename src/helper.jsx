'use strict';

// import React from 'react';
import fetch from 'isomorphic-fetch';

const api = {
  myFetch: function(url, method, bodyData, successCallback, failureCallback){
    //Create headers with authorization token stored in cookie:
    // const userCookie = document.cookie.slice(document.cookie.indexOf('user=')+5);
    // const accessToken = JSON.parse(decodeURIComponent(userCookie)).token;

    // const myHeaders = new Headers();
    // myHeaders.append('Authorization', 'Bearer ' + accessToken);
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
      .then(response => response.json())
      .then(response => successCallback(response))
      .catch(response => failureCallback(response));
  }
};

export default api;