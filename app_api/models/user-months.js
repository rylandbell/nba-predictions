var mongoose = require('mongoose');

// month
//   eligibleTeams
//   predictedWinners

//has a given team been chosen this month?
var eligibleTeamsSchema = new mongoose.Schema({
  ATL: {type: Boolean, 'default': true},
  BKN: {type: Boolean, 'default': true},
  BOS: {type: Boolean, 'default': true},
  CHA: {type: Boolean, 'default': true},
  CHI: {type: Boolean, 'default': true},
  CLE: {type: Boolean, 'default': true},
  DAL: {type: Boolean, 'default': true},
  DEN: {type: Boolean, 'default': true},
  DET: {type: Boolean, 'default': true},
  GSW: {type: Boolean, 'default': true},
  HOU: {type: Boolean, 'default': true},
  IND: {type: Boolean, 'default': true},
  LAC: {type: Boolean, 'default': true},
  LAL: {type: Boolean, 'default': true},
  MEM: {type: Boolean, 'default': true},
  MIA: {type: Boolean, 'default': true},
  MIL: {type: Boolean, 'default': true},
  MIN: {type: Boolean, 'default': true},
  NOP: {type: Boolean, 'default': true},
  NYK: {type: Boolean, 'default': true},
  OKC: {type: Boolean, 'default': true},
  ORL: {type: Boolean, 'default': true},
  PHI: {type: Boolean, 'default': true},
  PHX: {type: Boolean, 'default': true},
  POR: {type: Boolean, 'default': true},
  SAC: {type: Boolean, 'default': true},
  SAS: {type: Boolean, 'default': true},
  TOR: {type: Boolean, 'default': true},
  UTA: {type: Boolean, 'default': true},
  WAS: {type: Boolean, 'default': true}
});

//tracks predicted winners by day of month
var predictedWinnersSchema = new mongoose.Schema({
  1: {type: String, 'default': null},
  2: {type: String, 'default': null},
  3: {type: String, 'default': null},
  4: {type: String, 'default': null},
  5: {type: String, 'default': null},
  6: {type: String, 'default': null},
  7: {type: String, 'default': null},
  8: {type: String, 'default': null},
  9: {type: String, 'default': null},
  10: {type: String, 'default': null},
  11: {type: String, 'default': null},
  12: {type: String, 'default': null},
  13: {type: String, 'default': null},
  14: {type: String, 'default': null},
  15: {type: String, 'default': null},
  16: {type: String, 'default': null},
  17: {type: String, 'default': null},
  18: {type: String, 'default': null},
  19: {type: String, 'default': null},
  20: {type: String, 'default': null},
  21: {type: String, 'default': null},
  22: {type: String, 'default': null},
  23: {type: String, 'default': null},
  24: {type: String, 'default': null},
  25: {type: String, 'default': null},
  26: {type: String, 'default': null},
  27: {type: String, 'default': null},
  28: {type: String, 'default': null},
  29: {type: String, 'default': null},
  30: {type: String, 'default': null},
  31: {type: String, 'default': null}
});

//By 'userMonth', I mean one month of one user's prediction data
var userMonthSchema = new mongoose.Schema({
  
  //e.g. 2016-09
  month: { type: String, required: true },

  // include Display Name, ownerId (maybe not nested?)
  // user:
  eligibleTeams: eligibleTeamsSchema,
  predictedWinners: predictedWinnersSchema
});

//connect this schema to the database. automatically creates a MongoDB collection 'months' based on the supplied parameter 'Month'
mongoose.model('UserMonth', userMonthSchema);