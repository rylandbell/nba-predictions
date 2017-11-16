'use strict';
const fetch = require('isomorphic-fetch');

//transform MySportsFeeds data into format expected by my db:
const translateSingleGame = (rawData) => {

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

  // change team abbreviations to match those used elsewhere in app:
  if (gameSummary.roadTeam === "OKL") {
    gameSummary.roadTeam = "OKC";
  } else if (gameSummary.homeTeam === "OKL") {
    gameSummary.homeTeam = "OKC";
  } else if (gameSummary.roadTeam === "BRO") {
    gameSummary.roadTeam = "BKN";
  } else if (gameSummary.homeTeam === "BRO") {
    gameSummary.homeTeam = "BKN";
  }

  // mark winner and loser only if game is completed:
  if (rawData.isCompleted) {
    const homeScore = parseInt(rawData.homeScore,10);
    const roadScore = parseInt(rawData.awayScore,10);
    const homeTeam = gameSummary.homeTeam;
    const roadTeam = gameSummary.roadTeam;

    const homeTeamWon = homeScore > roadScore;

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
  headers.append('token', process.env.SCOREKEEPER_TOKEN);

  const newRequest = {
    method: 'PUT',
    mode: 'cors',
    cache: 'default',
    headers: headers,
    body: JSON.stringify(shapedData)
  };
  
  return fetch(url, newRequest)
};