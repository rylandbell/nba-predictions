'use strict';

const moment = require('moment-timezone');
const fetch = require('node-fetch');

const getNbaData = require('./getNbaData');
const saveGameData = require('./saveGameData');
const getUserMonths = require('./getUserMonths');
const scoreUserMonths = require('./scoreUserMonths');

// update a single day's game and user data, as scores become available
module.exports = (date = moment()) => {

  const targetDate =  moment(date).tz('America/Los_Angeles').format('YYYY-MM-DD');

  console.log('scorekeeping function ran at ', moment().format('kk:mm:ss'));
  console.log('with date = ', targetDate);
  
  const gameDataPromise = getNbaData(targetDate)
    .then(res => res.json())
    .then(data => saveGameData(targetDate, data))
    .then(res => res.json())
    .catch(console.log);

  const userMonthPromise = getUserMonths(targetDate)
    .then(res => res.json())
    .catch(console.log);

  Promise.all([gameDataPromise, userMonthPromise])
    .then(responseArray => scoreUserMonths(targetDate, ...responseArray))
    .catch(console.log);
};
