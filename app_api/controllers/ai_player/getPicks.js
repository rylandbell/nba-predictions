const moment = require("moment");
const munkres = require("munkres-js");

const { teamList, teamMap } = require("./constants");

//transpose a matrix (array of arrays)
function transpose(matrix) {
  const newMatrix = matrix[0].map((col, i) => {
    return matrix.map(row => {
      return row[i];
    });
  });
  return newMatrix;
}

// convert a probability object into an array of arrays
function convertToMatrix(probabilityObject, teams) {
  const matrix = [];

  //rows are teams, columns are dates
  teams.forEach(team => {
    matrix.push(probabilityObject[team]);
  });

  //need to transpose matrix to match format needed by Munkres algorithm:
  //so now rows are dates, columns are teams
  return transpose(matrix);
}

//Munkres minimizes sums, so we track loss probability rather than win probability (hence the "100 - ")
function markProbabilities(probabilityObject, dayObject) {
  const { date, team1, team2, carmelo_prob1, carmelo_prob2 } = dayObject;
  const dayNumber = moment(date).format("D");

  probabilityObject[team1][dayNumber] = 100 - Math.round(carmelo_prob1 * 100);
  probabilityObject[team2][dayNumber] = 100 - Math.round(carmelo_prob2 * 100);
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

//convert data object into an object of the form {'ATL': [31 loss probabilities], 'BKN':...}
function createProbabilityMatrix(rawData, teams) {
  const probabilityObject = {};
  teams.forEach(team => {
    probabilityObject[team] = [];
  });

  const filteredData = rawData.forEach(
    markProbabilities.bind(this, probabilityObject)
  );

  fillInBlanks(probabilityObject);

  const probabilityMatrix = convertToMatrix(probabilityObject, teams);

  return probabilityMatrix;
}

// Converts a simple array of daily picks to an object fitting the userMonth model
function convertToUserMonth(rawPredictions, month) {
  const predictedWinners = {};

  rawPredictions.forEach((pick, index) => {
    let [day, team] = pick;
    predictedWinners[day] = {
      teamName: teamMap[team],
      outcome: null,
      gameTime: `${moment(month)
        .startOf("month")
        .add(index, "days")
        .format("YYYY-MM-DD")}T19:00:00-08:00`
    };
  });

  const userMonth = {
    month,
    leagueId: process.env.AI_LEAGUE_ID,
    predictedWinners
  };

  return userMonth;
}

// run through the above helper functions to convert CSV data with
// winner probabilities from 538 into a predictedWinners object
module.exports = rawData => {
  // use command line input for month input if available; otherwise use next month:
  const targetMonth =
    process.argv[2] || moment().add(1, "months").format("YYYY-MM");
  const startDate = moment(targetMonth).startOf("month").format("YYYY-MM-DD");
  const endDate = moment(targetMonth).endOf("month").format("YYYY-MM-DD");

  // remove the first row, which contains column names
  rawData.splice(0, 1);

  // filter for games in the desired month:
  const dateFilteredData = rawData.filter(
    game => game.date >= startDate && game.date <= endDate
  );

  // create matrix modeling loss probabilities for the month (dates are row, teams are columns);
  const probabilityMatrix = createProbabilityMatrix(dateFilteredData, teamList);

  // get predictions via Munkres algorithm
  const rawPredictions = munkres(probabilityMatrix).map(pair => {
    return [pair[0], teamList[pair[1]]];
  });

  // convert predictions to match Pigeon Hoops userMonth format:
  const predictionUserMonth = convertToUserMonth(rawPredictions, targetMonth);

  return predictionUserMonth;
};
