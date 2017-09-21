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
  const url = `https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/scoreboard.json?fordate=${formattedDate}`;

  return fetch(url, options);
}