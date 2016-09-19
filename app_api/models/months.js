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
  1: {type: String},
  2: {type: String},
  3: {type: String},
  4: {type: String},
  5: {type: String},
  6: {type: String},
  7: {type: String},
  8: {type: String},
  9: {type: String},
  10: {type: String},
  11: {type: String},
  12: {type: String},
  13: {type: String},
  14: {type: String},
  15: {type: String},
  16: {type: String},
  17: {type: String},
  18: {type: String},
  19: {type: String},
  20: {type: String},
  21: {type: String},
  22: {type: String},
  23: {type: String},
  24: {type: String},
  25: {type: String},
  26: {type: String},
  27: {type: String},
  28: {type: String},
  29: {type: String},
  30: {type: String},
  31: {type: String}
});

//By 'userMonth', I mean one month of one user's prediction data
var userMonthSchema = new mongoose.Schema({
  
  //e.g., 'November'
  monthName: { type: String, required: true },

  // include Display Name, ownerId (maybe not nested?)
  // user:
  eligibleTeams: eligibleTeamsSchema,
  predictedWinners: predictedWinnersSchema
});

//connect this schema to the database. automatically creates a MongoDB collection 'months' based on the supplied parameter 'Month'
mongoose.model('Month', userMonthSchema);