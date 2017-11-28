'use strict';
const fetch = require('isomorphic-fetch');

module.exports = (date) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const server = isProduction ? 'https://frozen-retreat-57000.herokuapp.com' : 'http://localhost:3000';

  const month = date.substring(0, 7);
  const url = `${server}/api/userMonth/all/${month}`;

  const newRequest = {
    method: 'GET'
  };

  newRequest.headers = new Headers;
  newRequest.headers.append('token', process.env.SCOREKEEPER_TOKEN);
  
  return fetch(url, newRequest);
};
