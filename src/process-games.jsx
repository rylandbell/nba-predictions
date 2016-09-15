'use strict';

const processSingleGame = (data, index) => {
  var gameSummary = {};

  gameSummary.gameId = data.resultSets[1].rowSet[2*index][2];

  gameSummary.gameStatus = {
    startTime: data.resultSets[0].rowSet[index][4],
    hasStarted: (data.resultSets[0].rowSet[index][9] !== 0),
    roadScore: data.resultSets[1].rowSet[2*index][21],
    homeScore: data.resultSets[1].rowSet[2*index + 1][21],
    isFinal: (data.resultSets[0].rowSet[index][4] === 'Final')
  };

  gameSummary.roadTeam = {
    teamName: data.resultSets[1].rowSet[2*index][4],
    isEligible: true,
    isChosen: false,
    isWinner: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] > data.resultSets[1].rowSet[2*index + 1][21]),
    isLoser: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] < data.resultSets[1].rowSet[2*index + 1][21])
  };

  gameSummary.homeTeam = {
    teamName: data.resultSets[1].rowSet[2*index + 1][4],
    isEligible: true,
    isChosen: false,
    isWinner: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] < data.resultSets[1].rowSet[2*index + 1][21]),
    isLoser: (data.resultSets[0].rowSet[index][4] === 'Final') && (data.resultSets[1].rowSet[2*index][21] > data.resultSets[1].rowSet[2*index + 1][21])
  };

  return gameSummary;
}

const api = (dataString) => {
  const data = JSON.parse(dataString);
  const gamesArray = [];
  const gameCount = data.resultSets[0].rowSet.length;
  for (let i = 0; i<gameCount; i++){
    gamesArray.push(processSingleGame(data, i));
  }
  return gamesArray;
}

export default api;