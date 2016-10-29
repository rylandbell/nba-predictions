'use strict';

const moment = require('moment');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');
// const today = process.argv[2];
const today = moment().format('YYYY-MM-DD');
const yesterday = moment(today).subtract(1,'days').format('YYYY-MM-DD');
const tomorrow = moment(today).add(1,'days').format('YYYY-MM-DD');
console.log('About to update data for ', yesterday, today, tomorrow);

//used to update a single day's game and user data, as scores become available
const updateGameAndUserData = (date) => {
  GameData.updateSingleDate(date, UserData.markResults.bind(this,date));
}

updateGameAndUserData(yesterday);
updateGameAndUserData(today);
updateGameAndUserData(tomorrow);