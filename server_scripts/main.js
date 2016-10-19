'use strict';

// Call this file with:
// node -e 'require("./server_scripts/main.js").addDateRange("2016-11-09", 5)'
// node -e 'require("./server_scripts/main.js").updateByDate("2016-10-01")'

const fetch = require('isomorphic-fetch');
const moment = require('moment');

const GameData = require('./manage-game-data.js');

//used to update a single day's game and user data, as scores become available
module.exports.updateByDate = (date) => {
  GameData.updateSingleDate(date);
}

//used to populate database with initial schedule data
module.exports.addDateRange = (startDate, numberOfDays) => {
  var counter = 0;
  var currentDate;

  const timer = setInterval(
    function(){
      currentDate = moment(startDate).add(counter, 'days').format('YYYY-MM-DD');
      GameData.addSingleDate(currentDate);
      counter++;
      if(counter >= numberOfDays) {
        clearInterval(timer);
        return;
      }    
    }, 
  2000);
}