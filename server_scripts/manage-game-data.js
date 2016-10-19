'use strict';

//includes all communication with api/dailyGamesData, which stores data about NBA schedules and scores (but not user-specific data)

const fetch = require('isomorphic-fetch');
const moment = require('moment');

const Nba = require('./get-nba-data.js');
const Helper = require('./helper.js');

var server = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  server = 'https://frozen-retreat-57000';
}

//creates or updates dailyGamesData object in database
const updateGameData = function(url, method, data, successCallback, failureCallback){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  const newRequest = {
    method: method,
    mode: 'cors',
    cache: 'default',
    headers: headers,
    body: JSON.stringify(data)
  };
  
  fetch(url,newRequest)
    .then(response => response.json())
    .then(response => successCallback(response))
    .catch(response => failureCallback(response));
}

//callback for nbaFetch; receives NBA-formatted object
const shapeAndPostDay = (date, data) => {
  const dailyGamesData = Helper.shapeFullDay(date, data);
  const url = server + '/api/dailyGamesData';
  updateGameData(url, 'POST', dailyGamesData, console.log, console.log);
}

//callback for nbaFetch; receives NBA-formatted object
const shapeAndPutDay = (date, data) => {
  const dailyGamesData = Helper.shapeFullDay(date, data);
  const url = server + '/api/dailyGamesData/'+date;
  updateGameData(url, 'PUT', dailyGamesData, console.log, console.log);
}

//Takes date, fetches and shapes data, posts to DB
module.exports.addSingleDate = (date) => {
  Nba.nbaFetch(date, shapeAndPostDay.bind(this,date), console.log);
}

//Takes date, fetches and shapes data, sends to DB as PUT request
module.exports.updateSingleDate = (date) => {
  Nba.nbaFetch(date, shapeAndPutDay.bind(this,date), console.log);
}