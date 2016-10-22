'use strict';

const moment = require('moment');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');

//used to update a single day's game and user data, as scores become available
const updateGameAndUserData = (date) => {
  GameData.updateSingleDate(date, UserData.markResults.bind(this,date));
}

updateGameAndUserData(process.argv[2]);