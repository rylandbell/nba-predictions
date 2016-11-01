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

//get all userMonths for a given month (returns promise)
const getUserMonths = function (date) {
  const month = date.substring(0, 7);
  const url = server + '/api/userMonth/all/' + month;

  const newRequest = {
    method: 'GET',
  };

  return fetch(url, newRequest)
    .then(response => response.json());
};

//get dailyGamesData, by date (returns promise)
const getDailyGamesData = function (date) {
  const month = date.substring(0, 7);
  const url = server + '/api/dailyGamesData/' + month;

  const newRequest = {
    method: 'GET',
  };

  return fetch(url, newRequest)
    .then(response => response.json());
};

//post a result to the API:
const postResult = function (result, dateNumber) {
  const userMonthId = result._id;
  const url = server + '/api/userMonth/' + userMonthId;

  const newRequest = {
    method: 'PUT',
  };

  const bodyData = {
    day: dateNumber,
    outcome: result.outcome
  };

  newRequest.body = JSON.stringify(bodyData);
  newRequest.headers = new Headers();
  newRequest.headers.append('Content-Type', 'application/json');

  return fetch(url, newRequest)
    .then(response => response.json());
};

module.exports.markResults = function (date) {
  const dateNumber = parseInt(date.substring(8, 10));

  //get a month of games data, and all userMonths for the given month:
  Promise.all([
    getDailyGamesData(date),
    getUserMonths(date)
  ])

  //take each user's prediction data for the given date (along with the game outcome data), and run through determinePredictionOutcome function:
    .then(responses =>  Promise.all(responses[1].map(userMonth => {
      const activeDayGamesData = responses[0].filter(dayOfData => dayOfData.date === date);
      return determinePredictionOutcome(activeDayGamesData[0], userMonth.predictedWinners[dateNumber], userMonth._id)
    }
    )))

  //send results from determinePredictionOutcome to API
    .then(results => {
      results.forEach(result => {
        if (result) {
          postResult(result, dateNumber);
        }
      });
    })

  //finally, send any marked outcomes back to the API:
    // .then
    .catch(response => console.log('error in markResults function: ', response));

};
