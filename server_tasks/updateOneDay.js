'use strict';

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + typeof val);
});

const moment = require('moment');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');

//used to update a single day's game and user data, as scores become available
const updateGameAndUserData = (date) => {
  //update a single day of dailyGamesData with new nba.com data, then use new game data to update all userMonths
  GameData.updateSingleDate(date, UserData.markResults.bind(this,date));
  //then 
  //    query my DB to receive ALL userMonths for given month
  //    simultaneously, get dailyGamesData for given date
  //once both of above received:
  //    run data through my helper function to identify winners and losers
  //    send update requests to my API individually
  
}

// updateByDate(process.argv[2]);