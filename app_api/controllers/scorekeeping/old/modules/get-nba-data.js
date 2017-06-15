'use strict';

//includes all communication with NBA.com API
const fetch = require('node-fetch');
const moment = require('moment');
const request = require("request");
const template = require("nba-client-template");
const url = require("url");
const qs = require("querystring");

module.exports.nbaRequest = function (date, successCallback, failureCallback) {
  const HEADERS = {
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US",
    Accept: "*/*",
    "User-Agent": template.user_agent,
    Referer: template.referrer,
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  const options = {};
  options.headers = HEADERS;

  date = moment(date).format('MM/DD/YYYY');
  const url = 'http://stats.nba.com/stats/scoreboard/?GameDate=' + date + '&LeagueID=00&DayOffset=0';

  fetch(url, options)
    .then(response => response.json())
    .then(response => successCallback(response))
    .catch(response => console.log(response));
}
