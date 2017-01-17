'use strict';

//includes all communication with NBA.com API

const fetch = require('isomorphic-fetch');
const moment = require('moment');

//fetches raw NBA game data for the provided date (in "2016-05-19" format)
module.exports.nbaFetch = function (date, successCallback, failureCallback) {
  date = moment(date).format('MM/DD/YYYY');
  const url = 'http://stats.nba.com/stats/scoreboard/?GameDate=' + date + '&LeagueID=00&DayOffset=0';

  const headers = new Headers();
  headers.append('Referer', 'http://stats.nba.com/scores/');

  const newRequest = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  };

  fetch(url, newRequest)
    .then(response => response.json())
    .then(response => successCallback(response))
    .catch(response => failureCallback(response));
};
