'use strict';

const moment = require('moment');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');

// var x = [];
//used to update a single day's game and user data, as scores become available
module.exports = (date) => {

  // x.push(moment().format('mm:ss'));
  console.log('dataUpdateFunction ran at ', moment().format('kk:mm:ss'));

  // GameData.updateSingleDate(date, UserData.markResults.bind(this,date));
};
