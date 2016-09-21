'use strict';
const fetch = require('isomorphic-fetch');
const moment = require('moment');

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

const postGameData = function(data, successCallback, failureCallback){
  const url = 'http://localhost:3000/api/dailyGamesData';

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

// NBA single-game object => my single-game object
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

  return gameSummary;
};

//NBA full-day of JSON => dailyGamesData object
const shapeFullDay = (date, data) => {
  // const data = JSON.parse(dataString);
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

const main = (date) => {
  nbaFetch(date, shapeAndPostDay.bind(this,date), console.log);
}

main('2016-11-01');
main('2016-11-02');
main('2016-11-03');
main('2016-11-04');
main('2016-11-05');
