'use strict';

let server = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  server = 'https://frozen-retreat-57000.herokuapp.com';
}

//takes a day of dailyGamesData, and a single day of a single userMonth
const determinePredictionOutcome = function (dailyGamesData, userDay, userMonthId) {
  
  // did the user make a prediction for today?
  if (userDay.teamName) {
    const userTeam = userDay.teamName;
    let result = {
      _id: userMonthId
    };

    //compare the prediction against the actual outcome of each game:
    dailyGamesData.gameSummaries.forEach(game => {
      if (userTeam === game.winner) {
        result.outcome = 'success';
      } else if (userTeam === game.loser) {
        result.outcome = 'failure';
      }
    });

    return result;
  } else {
    return null;
  }
};

//post a prediction result to the API:
const postResult = function (result, dateNumber) {
  const userMonthId = result._id;
  const url = server + '/api/userMonth/' + userMonthId;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const bodyData = {
    day: dateNumber,
    outcome: result.outcome
  };

  const newRequest = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(bodyData)
  };

  return fetch(url, newRequest)
    .then(response => response.json());
};

module.exports = function (date, gamesData, userMonths) {
  const dateNumber = parseInt(date.substring(8, 10), 10);

  //take each user's prediction data for the given date (along with the game outcome data), and run through determinePredictionOutcome function:
  const scoredPicks = userMonths.map(userMonth => 
    determinePredictionOutcome(gamesData, userMonth.predictedWinners[dateNumber], userMonth._id)
  );

  //update the user's pick to show success or failure
  const postResultPromises = scoredPicks.map(pick => {
    if(pick) {
      return postResult(pick, dateNumber);
    }
  });

  return Promise.all(postResultPromises);
};
