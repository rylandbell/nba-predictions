const moment = require('moment');

const teamMap = require('./constants').teamMap;

//transpose a matrix (array of arrays)
const transpose = (matrix) => {
  const newMatrix = matrix[0].map(function(col, i) { 
    return matrix.map(function(row) { 
      return row[i] 
    })
  });
  return newMatrix;
}

//convert data object into an object of the form {'ATL': [31 loss probabilities], 'BKN':...}
module.exports.createProbabilityMatrix = function (rawData, teams) {

  // convert a probability object into an array of arrays
  const convertToMatrix = (probabilityObject) => {
    const matrix = [];
    
    //rows are teams, columns are dates
    teams.forEach(team => {
      matrix.push(probabilityObject[team]);
    })

    //need to transpose matrix to match format needed by Munkres algorithm:
    //so now rows are dates, columns are teams
    return transpose(matrix);
  }

  const probabilityObject = {};
  teams.forEach(team => {
    probabilityObject[team] = [];
  });

  //Munkres minimizes sums, so we track loss probability rather than win probability (hence the "100 - ")
  function markProbabilities(dayObject) {
    const dayNumber = moment(dayObject.date).format('D');
    probabilityObject[dayObject.team1][dayNumber] = 100 - Math.round(dayObject.carmelo_prob1*100);
    probabilityObject[dayObject.team2][dayNumber] = 100 - Math.round(dayObject.carmelo_prob2*100);
  }

  //if the 538 data doesn't provide a loss probability, set that probability to 100:
  function fillInBlanks(probabilityObject) {
    let i, team;
    for (team in probabilityObject) {
      if (probabilityObject.hasOwnProperty(team)) {
        for (i = 0; i <= 31; i++) {
          if (!probabilityObject[team][i]) {
            probabilityObject[team][i] = 100;
          }
        }
      }
    }
  }

  const filteredData = rawData
    .forEach(markProbabilities)
  
  fillInBlanks(probabilityObject);

  const probabilityMatrix = convertToMatrix(probabilityObject);

  return probabilityMatrix;
}

// Converts a simple array of daily picks to an object matching the userMonth model
module.exports.convertToUserMonth = function(rawPredictions, month) {
  const predictedWinners = {};
  rawPredictions.forEach((pick) => {
    const pickObject = {
      teamName: teamMap[pick[1]],
      outcome: null,
      gameTime: null
    }

    predictedWinners[pick[0]] = pickObject;
  });

  const userMonth = {
    month: month,
    leagueId: "5a1853b6e98bc2525b5b17a7",
    predictedWinners: predictedWinners,
  }

  return userMonth;
}