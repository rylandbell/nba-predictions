'use strict';
// node -e 'require("./server_scripts/manage-user-data.js").update("2016-10-18")'
// require('../app_api/models/db');
const Helper = require('./helper.js');
// const mongoose = require('mongoose');
// const UserMonthModel = mongoose.model('UserMonth');

const determinePredictionOutcome = function(dailyGamesData, userDay) {

  //did the user make a prediction for today?
  if(userDay.teamName){
    const userTeam === userDay.teamName;

    //find the game with the prediction
    dailyGamesData.gameSummaries.filter(
      game => (game.homeTeam.teamName === userTeam || game.roadTeam.teamName === userTeam)
    ).forEach(
      game => {
        if(game.homeTeam.teamName === userTeam && game.homeTeam.isWinner) {
          return true;
        } else if (game.)}
      }
    )
  } else {
    return null;
  }
}



//get all userMonths for a given month (returns promise)
const getUserMonths = function (month){
  // var filter = {
  //   month: month
  // };
  // return UserMonthModel
  //   .find(filter)
  //   .exec(function (err, userMonthArray) {
  //     if (!userMonthArray) {
  //       return [];
  //     } else if (err) {
  //       console.log("Error:",err);
  //       return [];
  //     }
  //     return userMonthArray;
  //   });
}

//get dailyGamesData, by date (returns promise)
const getDailyGamesData = function(date){

}

module.exports.markResults = function(date){
  //    query my DB to receive ALL userMonths for given month
  //    simultaneously, get dailyGamesData for given date
  Promise.all([
    getUserMonths(date.substring(0,7)),
    getDailyGamesData(date)
  ]).then((results) => {
    let dateNumber = parseInt(date.substring(8,10));
    let userDays = result[0]
      .map(userMonth => ({
        data: userMonth.predictedWinners[dateNumber]
        id: userMonth._id
      }));

    let dailyGamesData = result[1];

    userDays.forEach(userDay => determinePredictionOutcome(dailyGamesData,userDay.data));
  }).catch((error) => {
  throw error
  })
  //    send update requests to my API individually
};
