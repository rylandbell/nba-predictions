'use strict';

//transform MySportsFeeds data into format expected by my db:
const translateSingleGame = (rawData, index) => {
  const gameSummary = {};

  gameSummary.gameId = rawData.game.ID;
  gameSummary.gameDate = rawData.game.date;
  gameSummary.roadTeam = rawData.game.awayTeam.Abbreviation;
  gameSummary.homeTeam = rawData.game.homeTeam.Abbreviation;

  gameSummary.gameStatus = {
    startTime: rawData.game.time,
    hasStarted: !rawData.game.isUnplayed,
    roadScore: rawData.awayScore,
    homeScore: rawData.homeScore,
    isFinal: rawData.isCompleted
  };

  if (rawData.isCompleted) {
    const homeTeamWon = rawData.homeScore > rawData.awayScore;
    const homeTeam = rawData.game.homeTeam.Abbreviation;
    const roadTeam = rawData.game.awayTeam.Abbreviation;

    gameSummary.winner = homeTeamWon ? homeTeam : roadTeam;
    gameSummary.loser = homeTeamWon ? roadTeam : homeTeam;
  } 

  return gameSummary;
};

const translateGameData = (date, rawData) => {
  const gameSummaries = rawData.scoreboard.gameScore.map(game => translateSingleGame(game));

  return {
    date: date,
    month: date.substring(0, 7),
    gameSummaries: gameSummaries
  };
};

module.exports = (date, rawData) => {
  const shapedData = translateGameData(date, rawData);
  
  console.log(shapedData);
  //post updated data to my DB:
}










// //includes all communication with api/dailyGamesData, which stores data about NBA schedules and scores (but not user-specific data)

// const fetch = require('isomorphic-fetch');

// const Nba = require('./get-nba-data.js');
// const Helper = require('./helper.js');

// var server = 'http://localhost:3000';
// if (process.env.NODE_ENV === 'production') {
//   server = 'https://frozen-retreat-57000.herokuapp.com';
// }

// //creates or updates dailyGamesData object in database
// const updateGameData = function (url, method, data, successCallback, failureCallback) {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');

//   const newRequest = {
//     method: method,
//     mode: 'cors',
//     cache: 'default',
//     headers: headers,
//     body: JSON.stringify(data)
//   };

//   fetch(url, newRequest)
//     .then(response => response.json())
//     .then(response => successCallback(response))
//     .catch(response => failureCallback(response));
// };

// //callback for nbaFetch; receives NBA-formatted object
// const shapeAndPostDay = (date, data) => {
//   const dailyGamesData = Helper.shapeFullDay(date, data);
//   const url = server + '/api/dailyGamesData';
//   updateGameData(url, 'POST', dailyGamesData, console.log, console.log);
// };

// //callback for nbaFetch; receives NBA-formatted object
// const shapeAndPutDay = (date, callback, data) => {
//   const dailyGamesData = Helper.shapeFullDay(date, data);
//   const url = server + '/api/dailyGamesData/' + date;
//   updateGameData(url, 'PUT', dailyGamesData, callback || console.log, console.log);
// };

// //Takes date, fetches and shapes data, posts to DB
// module.exports.addSingleDate = (date) => {
//   Nba.nbaRequest(date, shapeAndPostDay.bind(this, date), console.log);
// };

// //Takes date, fetches and shapes data, sends to DB as PUT request
// module.exports.updateSingleDate = (date, successCallback) => {
//   console.log('GameData.updateSingleDate called for ', date);
//   Nba.nbaRequest(date, shapeAndPutDay.bind(this, date, successCallback || console.log));
// };
