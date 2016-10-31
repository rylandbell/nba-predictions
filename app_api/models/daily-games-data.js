// DailyGamesData
//   [GameSummary]
//     TeamSummary * 2 (home & road)
//     GameStatus

var mongoose = require('mongoose');

var gameStatusSchema = new mongoose.Schema({
  startTime: { type: String },
  hasStarted: { type: Boolean, required: true },
  homeScore: { type: String },
  roadScore: { type: String },
  isFinal: { type: Boolean, required: true }
});

var gameSummarySchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  gameDate: { type: String, required: true },
  winner: { type: String, default: null },
  loser: { type: String, default: null },
  roadTeam: { type: String, required: true },
  homeTeam: { type: String, required: true },
  gameStatus: gameStatusSchema,
});

//By 'userMonth', I mean one month of one user's prediction data
var dailyGamesDataSchema = new mongoose.Schema({

  //e.g. 2016-09
  month: { type: String, required: true },

  //e.g. 2016-09-03
  date: { type: String, required: true, unique: true },

  gameSummaries: [gameSummarySchema]
});

//connect this schema to the database. automatically creates a MongoDB collection 'months' based on the supplied parameter 'Month'
mongoose.model('DailyGamesData', dailyGamesDataSchema);
