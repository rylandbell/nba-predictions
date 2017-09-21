'use strict';

require('dotenv').config({path:'../../../.env'});

const moment = require('moment-timezone');
const fetch = require('node-fetch');

const getNbaData = require('./getNbaData');
const saveGameData = require('./saveGameData');
const getUserMonths = require('./getUserMonths');
const scoreUserMonths = require('./scoreUserMonths');

// update a single day's game and user data, as scores become available
// module.exports = () => {
const main = () => {  
  // const today = moment().tz('America/Los_Angeles').format('YYYY-MM-DD');
  const today =  moment('2017-04-12').tz('America/Los_Angeles').format('YYYY-MM-DD');

  console.log('scorekeeping function ran at ', moment().format('kk:mm:ss'));
  console.log('with date = ', today);
  
  const gameDataPromise = getNbaData(today)
    .then(res => res.json())
    .then(data => saveGameData(today, data))
    .then(res => res.json())
    .catch(console.log);

  const userMonthPromise = getUserMonths(today)
    .then(res => res.json())
    .catch(console.log);

  Promise.all([gameDataPromise, userMonthPromise])
    .then(responseArray => scoreUserMonths(today, ...responseArray))
    .catch(console.log);
};

main();