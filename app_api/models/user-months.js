var mongoose = require('mongoose');

//tracks predicted winners by day of month
var predictedWinnersSchema = new mongoose.Schema({
  1: { type: String, default: null },
  2: { type: String, default: null },
  3: { type: String, default: null },
  4: { type: String, default: null },
  5: { type: String, default: null },
  6: { type: String, default: null },
  7: { type: String, default: null },
  8: { type: String, default: null },
  9: { type: String, default: null },
  10: { type: String, default: null },
  11: { type: String, default: null },
  12: { type: String, default: null },
  13: { type: String, default: null },
  14: { type: String, default: null },
  15: { type: String, default: null },
  16: { type: String, default: null },
  17: { type: String, default: null },
  18: { type: String, default: null },
  19: { type: String, default: null },
  20: { type: String, default: null },
  21: { type: String, default: null },
  22: { type: String, default: null },
  23: { type: String, default: null },
  24: { type: String, default: null },
  25: { type: String, default: null },
  26: { type: String, default: null },
  27: { type: String, default: null },
  28: { type: String, default: null },
  29: { type: String, default: null },
  30: { type: String, default: null },
  31: { type: String, default: null }
});

//By 'userMonth', I mean one month of one user's prediction data
var userMonthSchema = new mongoose.Schema({

  //e.g. 2016-09
  month: { type: String, required: true },
  ownerId: { type: String, required: true },
  predictedWinners: predictedWinnersSchema
});

//connect this schema to the database. automatically creates a MongoDB collection 'months' based on the supplied parameter 'Month'
mongoose.model('UserMonth', userMonthSchema);
