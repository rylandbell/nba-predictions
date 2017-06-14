'use strict';
const fetch = require('isomorphic-fetch');

//transform MySportsFeeds data into format expected by my db:
const translateSingleGame = (rawData, index) => {
  const gameSummary = {
    gameId: rawData.game.ID,
    gameDate: rawData.game.date,
    roadTeam: rawData.game.awayTeam.Abbreviation,
    homeTeam: rawData.game.homeTeam.Abbreviation,
    gameStatus: {
      startTime: rawData.game.time,
      hasStarted: !rawData.game.isUnplayed,
      roadScore: rawData.awayScore,
      homeScore: rawData.homeScore,
      isFinal: rawData.isCompleted
    }
  };

  // mark winner and loser only if game is completed:
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

  const isProduction = process.env.NODE_ENV === 'production';
  const server = isProduction ? 'https://frozen-retreat-57000.herokuapp.com' : 'http://localhost:3000';

  const url = `${server}/api/dailyGamesData/${date}`;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const newRequest = {
    method: 'PUT',
    mode: 'cors',
    cache: 'default',
    headers: headers,
    body: JSON.stringify(shapedData)
  };
  
  return fetch(url, newRequest)
};