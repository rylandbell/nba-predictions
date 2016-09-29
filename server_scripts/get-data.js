'use strict';
// Call this file with:
// node -e 'require("./server_scripts/get-data.js").addDateRange('2016-11-09', 5)'

var server = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  server = 'https://frozen-retreat-57000';
}

const fetch = require('isomorphic-fetch');
const moment = require('moment');

//fetches raw NBA game data for the provided date (in 2016-05-19 format)
const nbaFetch = function(date, successCallback, failureCallback){
  date = moment(date).format('MM/DD/YYYY');
  const url = 'http://stats.nba.com/stats/scoreboard/?GameDate='+date+'&LeagueID=00&DayOffset=0';

  const headers = new Headers();
  headers.append('Referer', 'http://stats.nba.com/scores/');
  
  const newRequest = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  };
  
  fetch(url,newRequest)
    .then(response => response.json())
    .then(response => successCallback(response))
    .catch(response => failureCallback(response));
};

//adds translated game data to database
const postGameData = function(data, successCallback, failureCallback){
  const url = server + '/api/dailyGamesData';

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  const newRequest = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: headers,
    body: JSON.stringify(data)
  };
  
  fetch(url,newRequest)
    .then(response => response.json())
    .then(response => successCallback(response))
    .catch(response => failureCallback(response));
}

// Translates NBA single-game object => my single-game object
const shapeSingleGame = (data, index) => {
  var gameSummary = {};

  gameSummary.gameId = data.resultSets[1].rowSet[2*index][2];
  gameSummary.gameDate = data.resultSets[0].rowSet[index][0].substring(0,10);

  gameSummary.gameStatus = {
    startTime: data.resultSets[0].rowSet[index][4],
    hasStarted: (data.resultSets[0].rowSet[index][9] !== 0),
    roadScore: data.resultSets[1].rowSet[2*index][21],
    homeScore: data.resultSets[1].rowSet[2*index + 1][21],
    isFinal: (data.resultSets[0].rowSet[index][4] === 'Final')
  };

  //This big if-else block is to correctly distinguish the home and road teams
  if(data.resultSets[1].rowSet[2*index][3] === data.resultSets[0].rowSet[index][7]){
    gameSummary.roadTeam = {
      teamName: data.resultSets[1].rowSet[2*index][4],
      isWinner: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] > data.resultSets[1].rowSet[2*index + 1][21]),
      isLoser: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] < data.resultSets[1].rowSet[2*index + 1][21])
    };

    gameSummary.homeTeam = {
      teamName: data.resultSets[1].rowSet[2*index + 1][4],
      isWinner: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] < data.resultSets[1].rowSet[2*index + 1][21]),
      isLoser: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] > data.resultSets[1].rowSet[2*index + 1][21])
    };
  } else {
    gameSummary.homeTeam = {
      teamName: data.resultSets[1].rowSet[2*index][4],
      isWinner: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] > data.resultSets[1].rowSet[2*index + 1][21]),
      isLoser: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] < data.resultSets[1].rowSet[2*index + 1][21])
    };

    gameSummary.roadTeam = {
      teamName: data.resultSets[1].rowSet[2*index + 1][4],
      isWinner: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] < data.resultSets[1].rowSet[2*index + 1][21]),
      isLoser: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] > data.resultSets[1].rowSet[2*index + 1][21])
    };
  }

  return gameSummary;
};

//Translates full day of NBA JSON => dailyGamesData object
const shapeFullDay = (date, data) => {
  const gameSummaries = [];
  const gameCount = data.resultSets[0].rowSet.length;
 
  for (let i = 0; i<gameCount; i++){
    gameSummaries.push(shapeSingleGame(data, i));
  }

  const day = {
    date: date,
    month: date.substring(0,7),
    gameSummaries: gameSummaries
  }

  return day;
};

//callback for nbaFetch; receives NBA-formatted object
const shapeAndPostDay = (date, data) => {
  const dailyGamesData = shapeFullDay(date, data);
  postGameData(dailyGamesData,console.log,console.log);
}

//Takes date, fetches and shapes data, posts to DB
const addSingleDate = (date) => {
  nbaFetch(date, shapeAndPostDay.bind(this,date), console.log);
}

//startDate formatted like '2016-10-20'
module.exports.addDateRange = (startDate, numberOfDays) => {
  var counter = 0;
  var currentDate;

  const timer = setInterval(
    function(){
      currentDate = moment(startDate).add(counter, 'days').format('YYYY-MM-DD');
      addSingleDate(currentDate);
      counter++;
      if(counter >= numberOfDays) {
        clearInterval(timer);
        return;
      }
      
    }, 
  2000);
}
