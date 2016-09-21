// DailyGamesData
//   [GameSummary]
//     TeamSummary * 2 (home & road)
//     GameStatus

var mongoose = require('mongoose');

var gameStatusSchema = new mongoose.Schema({
  startTime: { type: String },
  hasStarted: { type: String, required: true },
  homeScore: { type: String },
  roadScore: { type: String },
  isFinal: { type: Boolean, required: true }
});

var teamSummarySchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  isWinner: { type: Boolean, required: true },
  isLoser: { type: Boolean, required: true }
});

var gameSummarySchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  gameStatus: gameStatusSchema,
  roadTeam: teamSummarySchema,
  homeTeam: teamSummarySchema
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
