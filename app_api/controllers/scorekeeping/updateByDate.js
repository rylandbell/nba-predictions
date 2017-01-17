'use strict';

const moment = require('moment');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');

console.log('updateByDate ran at UTC: ', moment().format('YYYY-MM-DD kk:mm'));

//used to update a single day's game and user data, as scores become available
const updateGameAndUserData = (date) => {
  console.log('running updateGameAndUserData for ', date)
  GameData.updateSingleDate(date, UserData.markResults.bind(this, date));
};

if (process.argv.length > 2) {
  updateGameAndUserData(process.argv[2]);
} else {
  //subtract 9 hours from UTC to arrive at a time that is at the end of the recently completed day, which is called 'today'
  const today = moment().subtract(9, 'hours').format('YYYY-MM-DD');

  //run updateData on yesterday's games for redundancy
  const yesterday = moment(today).subtract(1, 'days').format('YYYY-MM-DD');

  //run updateData on tomorrow's games to catch schedule changes
  const tomorrow = moment(today).add(1, 'days').format('YYYY-MM-DD');

  updateGameAndUserData(yesterday);
  updateGameAndUserData(today);
  updateGameAndUserData(tomorrow);
}

