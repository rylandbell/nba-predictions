var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  getToken: function (req) {
    if (req.body.token) {
      return req.body.token;
    } else {
      console.log('Couldn\'t find a cookie token');
      return null;
    }
  }
});

var ctrlUserMonths = require('../controllers/user-months');
var ctrlPredictedWinners = require('../controllers/predicted-winners');
var ctrlDailyGamesData = require('../controllers/daily-games-data');
var ctrlAuth = require('../controllers/authentication');

// routes for calls to userMonths folder:
router.get('/userMonth/:userMonthId', ctrlUserMonths.userMonthReadOne);
router.post('/userMonth', ctrlUserMonths.userMonthCreate);
router.delete('/userMonth/:userMonthId', ctrlUserMonths.userMonthDelete);

router.put('/userMonth/:userMonthId/predictedWinners', ctrlPredictedWinners.predictedWinnersUpdate);

// routes for dailyGamesData:
router.get('/dailyGamesData/:month', ctrlDailyGamesData.dailyGamesDataGetMonth);
router.post('/dailyGamesData', ctrlDailyGamesData.dailyGamesDataCreate);

// routes for authentication requests:
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
