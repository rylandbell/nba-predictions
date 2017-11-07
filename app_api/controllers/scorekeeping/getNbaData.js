'use strict';
const moment = require('moment-timezone');

//fetch NBA scores data from MySportsFeeds for provided date
module.exports = date => {
  const HEADERS = {
    "Authorization": process.env.MYSPORTSFEEDS_TOKEN
  };

  const options = {};
  options.headers = HEADERS;

  const formattedDate = moment(date).format('YYYYMMDD');
  const url = `https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/scoreboard.json?fordate=${formattedDate}`

  return fetch(url, options);
}