
'use strict';

// import React from 'react';
import fetch from 'isomorphic-fetch';

const api = {
  myFetch: function(url, method, successCallback, failureCallback){
    //Create headers with authorization token stored in cookie:
    // const userCookie = document.cookie.slice(document.cookie.indexOf('user=')+5);
    // const accessToken = JSON.parse(decodeURIComponent(userCookie)).token;

    // const myHeaders = new Headers();
    // myHeaders.append('Authorization', 'Bearer ' + accessToken);
    
    const myInit = {
      method: method,
      // headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    fetch(url,myInit)
      .then(response => response.json())
      .then(response => successCallback(response))
      .catch(response => failureCallback(response));
  }
};

export default api;