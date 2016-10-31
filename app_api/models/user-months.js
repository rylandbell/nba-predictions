var mongoose = require('mongoose');

//data for single day's prediction (outcome="success", "failure", or null):
var predictionSchema = new mongoose.Schema({
  teamName: { type: String, default: null },
  outcome: { type: String, default: null },

  //2016-11-19T19:30:00Z  (use east coast time);
  gameTime: { type: String, default: null }
});

//tracks predicted winners by day of month
var predictedWinnersSchema = new mongoose.Schema({
  1: { type: predictionSchema, default: {} },
  2: { type: predictionSchema, default: {} },
  3: { type: predictionSchema, default: {} },
  4: { type: predictionSchema, default: {} },
  5: { type: predictionSchema, default: {} },
  6: { type: predictionSchema, default: {} },
  7: { type: predictionSchema, default: {} },
  8: { type: predictionSchema, default: {} },
  9: { type: predictionSchema, default: {} },
  10: { type: predictionSchema, default: {} },
  11: { type: predictionSchema, default: {} },
  12: { type: predictionSchema, default: {} },
  13: { type: predictionSchema, default: {} },
  14: { type: predictionSchema, default: {} },
  15: { type: predictionSchema, default: {} },
  16: { type: predictionSchema, default: {} },
  17: { type: predictionSchema, default: {} },
  18: { type: predictionSchema, default: {} },
  19: { type: predictionSchema, default: {} },
  20: { type: predictionSchema, default: {} },
  21: { type: predictionSchema, default: {} },
  22: { type: predictionSchema, default: {} },
  23: { type: predictionSchema, default: {} },
  24: { type: predictionSchema, default: {} },
  25: { type: predictionSchema, default: {} },
  26: { type: predictionSchema, default: {} },
  27: { type: predictionSchema, default: {} },
  28: { type: predictionSchema, default: {} },
  29: { type: predictionSchema, default: {} },
  30: { type: predictionSchema, default: {} },
  31: { type: predictionSchema, default: {} }
});

//By 'userMonth', I mean one month of one user's prediction and outcome data
var userMonthSchema = new mongoose.Schema({

  //e.g. 2016-09
  month: { type: String, required: true },
  ownerId: { type: String, required: true },
  ownerDisplayName: { type: String, required: true, default: 'Anon' },
  predictedWinners: { type: predictedWinnersSchema, default: predictedWinnersSchema },
  standingsData: {
    winCount: { type: Number, default: 0 },
    lossCount: { type: Number, default: 0 }
  },
  leagueName: { type: String, default: 'alpha' }
});

//connect this schema to the database. automatically creates a MongoDB collection 'usermonths' based on the supplied parameter 'month'
mongoose.model('UserMonth', userMonthSchema);
