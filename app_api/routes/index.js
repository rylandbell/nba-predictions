var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  getToken: function (req) {
    if (req.cookies.token) {
      return req.cookies.token;
    } else {
      console.log('Couldn\'t find a cookie token');
      return null;
    }
  }
});

var ctrlUserMonths = require('../controllers/user-months');
var ctrlDailyGamesData = require('../controllers/daily-games-data');
var ctrlAuth = require('../controllers/authentication');

// routes for calls to userMonths folder:
router.get('/userMonth/:month', auth, ctrlUserMonths.userMonthReadOne);
router.post('/userMonth', auth, ctrlUserMonths.userMonthCreate);
router.delete('/userMonth/:userMonthId', auth, ctrlUserMonths.userMonthDelete);

router.put('/userMonth/:month/predictedWinners', auth, ctrlUserMonths.predictedWinnersUpdate);

// routes for dailyGamesData:
router.get('/dailyGamesData/:month', ctrlDailyGamesData.dailyGamesDataGetMonth);
router.post('/dailyGamesData', ctrlDailyGamesData.dailyGamesDataCreate);

// routes for authentication requests:
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;