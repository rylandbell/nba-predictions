'use strict';

const moment = require('moment');
const GameData = require('./modules/manage-game-data.js');

//used to populate database with initial schedule data
const addDateRange = (startDate, numberOfDays) => {
  var counter = 0;
  var currentDate;

  //timer spreads out the NBA.com calls so it doesn't look like a DDOS:
  const timer = setInterval(
    function () {
      currentDate = moment(startDate).add(counter, 'days').format('YYYY-MM-DD');
      GameData.addSingleDate(currentDate);
      counter++;
      if (counter >= numberOfDays) {
        clearInterval(timer);
        return;
      }
    },

  1000);
};

addDateRange(process.argv[2], process.argv[3]);
