'use strict';
//Pure functions only, no API calls

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
module.exports.shapeFullDay = (date, data) => {
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