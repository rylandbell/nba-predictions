'use strict';

//includes all communication with NBA.com API
const fetch = require('node-fetch');
const moment = require('moment');
const request = require("request");
const template = require("nba-client-template");
const url = require("url");
const qs = require("querystring");

//fetches raw NBA game data for the provided date (in "2016-05-19" format)
// module.exports.nbaFetch = function (date, successCallback, failureCallback) {
  // const fetch = require('isomorphic-fetch');
// 
//   date = moment(date).format('MM/DD/YYYY');
//   const url = 'http://stats.nba.com/stats/scoreboard/?GameDate=' + date + '&LeagueID=00&DayOffset=0';

//   const headers = new Headers();
//   headers.append('referer', 'http://stats.nba.com/scores/');

//   const newRequest = {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'default',
//     headers: headers
//   };

//   fetch(url, newRequest)
    // .then(response => response.json())
    // .then(response => successCallback(response))
    // .catch(response => console.log(response));
// };

// module.exports.nbaRequest = function (date, successCallback, failureCallback) {
//   console.log('nbaRequest called for', date)
//   date = moment(date).format('MM/DD/YYYY');
//   var options = { 
//     method: 'GET',
//     url: 'http://stats.nba.com/stats/scoreboard/',
//     qs: { GameDate: date, LeagueID: '00', DayOffset: '0' },
//     headers: {
//       'cache-control': 'no-cache',
//       referer: 'http://stats.nba.com/scores/'
//     }
//   };

//   request(options, function (error, response, body) {
//     if (error) {
//       console.log('error from nbaRequest: ', error);
//       throw new Error(error);
//     } else {
//       console.log('successful nbaRequest, body= ', body.substring(0,40));
//     }

//     successCallback(JSON.parse(body));
//   });
// }

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
