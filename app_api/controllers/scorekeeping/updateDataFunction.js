'use strict';

const moment = require('moment-timezone');

const GameData = require('./modules/manage-game-data.js');
const UserData = require('./modules/manage-user-data.js');

//used to update a single day's game and user data, as scores become available
module.exports = () => {
  const today = moment().tz('America/Los_Angeles').format('YYYY-MM-DD');
  const yesterday = moment().subtract(1, 'days').tz('America/Los_Angeles').format('YYYY-MM-DD');
  
  console.log('updateDataFunction ran at ', moment().format('kk:mm:ss'));
  console.log('with dates = ', today, yesterday);
  
  Promise.all([
    GameData.updateSingleDate(today, UserData.markResults.bind(this, today)),
    // GameData.updateSingleDate(today, UserData.markResults.bind(this, yesterday))
  ])
    .then(()=>{console.log('promise resolved!')});
};
