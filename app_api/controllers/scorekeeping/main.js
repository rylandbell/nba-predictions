'use strict';

const moment = require('moment-timezone');
const fetch = require('node-fetch');

const getNbaData = require('./getNbaData');
const saveGameData = require('./saveGameData');
const getUserMonths = require('./getUserMonths');
const scoreUserMonths = require('./scoreUserMonths');

// update a single day's game and user data, as scores become available
const main = (date) => {

  // For now, default to scorekeeping for yesterday only:
  const targetDate = moment(date).tz('America/Los_Angeles').format('YYYY-MM-DD');

  console.log('scorekeeping function ran at ', moment().format('kk:mm:ss'));
  console.log('with date = ', targetDate);

  // Fetch NBA data, then save it to DB
  const gameDataPromise = getNbaData(targetDate)
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`No data in response. (${res.status} status.)`);
      }
    })
    .then(data => saveGameData(targetDate, data))
    .then(res => res.json())
    .catch(console.log);

  // Fetch relevant userMonths to score predictions
  const userMonthPromise = getUserMonths(targetDate)
    .then(res => res.json())
    .catch(console.log);

  // Score fetched userMonths using fetched game-result data
  Promise.all([gameDataPromise, userMonthPromise])
    .then(responseArray => scoreUserMonths(targetDate, ...responseArray))
    .catch(console.log);
};

// Update scores for yesterday's games, and the day before for redundancy's sake
const day0 = moment().format('YYYY-MM-DD');
const day1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
const day2 = moment().subtract(2, 'days').format('YYYY-MM-DD');

// main(day2);
// setTimeout(() => {main(day1)}, 5000);
// setTimeout(() => {main(day0)}, 10000);

main(day1);