const fs = require("fs");
const request = require("request");
const parse = require("csv-parse");
const moment = require("moment");
const munkres = require("munkres-js");
const fetch = require("isomorphic-fetch");

const Helper = require("./helper");
const colNames = require("./constants").colNames;
const teamList = require("./constants").teamList;

const targetUrl = require("./constants").url;

// get date range from command line input:
if (process.argv.length < 3) {
  console.log("Please enter a month, in YYYY-MM form.");
  process.exit();
}
const targetMonth = process.argv[2];
const startDate = moment(targetMonth).startOf("month").format("YYYY-MM-DD");
const endDate = moment(targetMonth).endOf("month").format("YYYY-MM-DD");

// convert CSV data with winner probabilities from 538 into a predictedWinners object
const getPicks = rawData => {
  // remove the first row, which contains headers data
  rawData.splice(0, 1);

  // filter for games in the desired month:
  const dateFilteredData = rawData.filter(
    game => game.date >= startDate && game.date <= endDate
  );

  // create matrix modeling loss probabilities for the month (dates are row, teams are columns);
  const probabilityMatrix = Helper.createProbabilityMatrix(
    dateFilteredData,
    teamList
  );

  // get predictions via Munkres algorithm
  const rawPredictions = munkres(probabilityMatrix).map(pair => {
    return [pair[0], teamList[pair[1]]];
  });

  // convert predictions to match Pigeon Hoops userMonth format:
  const predictionUserMonth = Helper.convertToUserMonth(
    rawPredictions,
    targetMonth
  );

  submitUserMonth(predictionUserMonth)
    .then(res => res.json())
    .then(console.log)
    .catch(err => {
      console.log("Error submitting AI Picks: ", err);
    });
};

const submitUserMonth = predictionBody => {
  const isProduction = process.env.NODE_ENV === "production";
  const server = isProduction
    ? "https://frozen-retreat-57000.herokuapp.com"
    : "http://localhost:3000";

  const url = `${server}/api/userMonth`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", process.env.AI_PLAYER_TOKEN);

  const newRequest = {
    method: "POST",
    mode: "cors",
    cache: "default",
    headers: headers,
    body: JSON.stringify(predictionBody)
  };

  return fetch(url, newRequest);
};

// Get up-to-date data from FiveThirtyEight:
// request(targetUrl, function (error, response, body) {
//   if (error) {
//     console.log(error);
//   } else if (response.statusCode !== 200) {
//     console.log('Bad status code: ', response);
//   } else {
//     parse(body, { columns: colNames }, function(err, output) {
//       if (err) {
//         console.log("error parsing CSV data: ", err);
//       } else {
//         getPicks(output);
//       }
//     });
//   }
// });

// Use locally stored sample data
fs.readFile(`${__dirname}/nba_elo.csv`, (err, data) => {
  if (err) {
    console.log("error reading file: ", err);
  } else {
    parse(data, { columns: colNames }, function(err, output) {
      if (err) {
        console.log("error parsing CSV data: ", err);
      } else {
        getPicks(output);
      }
    });
  }
});

// TODO: Fetch/display Hungarian data appropriately for users:
// add feature in React app to show/hide Hungarian predictions

// TODO: Set up task to create Hungarian userMonth monthly
// can it send me an email/notification upon completion?

// TODO: Use promises instead of callbacks?
// What's the cleanest way to:
//   1: get data
//   2: convert data -> predictions
//   3: submit data to Pigeon Hoops
//   handle errors along the way
