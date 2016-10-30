'use strict';

const moment = require('moment');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');

console.log('updateByDate ran at UTC: ', moment().format('YYYY-MM-DD kk:mm'));

//task should run at 12AM Pacific
//subtract 9 hours from UTC to arrive at a time that is at the end of the recently completed day, which is called 'today' 
const today = moment().subtract(9,'hours').format('YYYY-MM-DD');

//run updateData on yesterday's games for redundancy
const yesterday = moment(today).subtract(1,'days').format('YYYY-MM-DD');

//run updateData on tomorrow's games to catch schedule changes
const tomorrow = moment(today).add(1,'days').format('YYYY-MM-DD');
console.log('About to update data for ', yesterday, today, tomorrow);

//used to update a single day's game and user data, as scores become available
const updateGameAndUserData = (date) => {
  GameData.updateSingleDate(date, UserData.markResults.bind(this,date));
}

updateGameAndUserData(yesterday);
updateGameAndUserData(today);
updateGameAndUserData(tomorrow);