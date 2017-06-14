'use strict';

const moment = require('moment-timezone');
const fetch = require('node-fetch');

const saveGameData = require('./saveGameData');

// const GameData = require('./modules/manage-game-data.js');
// const UserData = require('./modules/manage-user-data.js');

const getNbaScores = date => {
  const HEADERS = {
    "Authorization": "Basic cnlsYW5kYmVsbDoqKjg1XnBhcnR5XkFMT05HXmZhcm1lcnNeOTcqKg=="
  };

  const options = {};
  options.headers = HEADERS;

  const formattedDate = moment(date).format('YYYYMMDD');
  const url = `https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/scoreboard.json?fordate=${formattedDate}`;

  return fetch(url, options);
}

//used to update a single day's game and user data, as scores become available
// module.exports = () => {
const scorekeeping = function(){
  // const today = moment().tz('America/Los_Angeles').format('YYYY-MM-DD');
  const today = '2017-04-12';
  console.log('updateDataFunction ran at ', moment().format('kk:mm:ss'));
  console.log('with date = ', today);
  
  getNbaScores(today)
    .then(res => res.json())
    .then(data => saveGameData(today, data))
    .then(res => res.json())
    .then(console.log)
    .catch(console.log);

  // getNbaScores()
  //   .then(saveGameData)
  //   .then(
  //     Promise.all(getUserMonths, getGameData)
  //       .then(saveUserMonths)
  //   );
};

scorekeeping();