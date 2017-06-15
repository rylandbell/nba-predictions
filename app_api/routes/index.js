'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  getToken: function (req) {
    if (req.body.token) {
      return req.body.token;
    } else if (req.cookies.token) {
      return req.cookies.token;
    } else {
      console.log('Couldn\'t find a cookie token');
      return null;
    }
  }
});

const ctrlUserMonths = require('../controllers/user-months');
const ctrlDailyGamesData = require('../controllers/daily-games-data');
const ctrlMessages = require('../controllers/messages');
const ctrlAuth = require('../controllers/authentication');

// routes for calls to userMonths folder:
router.get('/userMonth/:month', auth, ctrlUserMonths.userMonthReadOne);
router.get('/userMonth', auth, ctrlUserMonths.userMonthReadAllForUser);
router.get('/userMonth/all/:month', ctrlUserMonths.userMonthReadAllByMonth);
router.get('/userMonth/all-public/:month', auth, ctrlUserMonths.userMonthReadAllPublic);
router.post('/userMonth', auth, ctrlUserMonths.userMonthCreate);
router.delete('/userMonth/:userMonthId', auth, ctrlUserMonths.userMonthDelete);
router.put('/userMonth/:month/predictedWinners', auth, ctrlUserMonths.predictedWinnersUpdate);
router.put('/userMonth/:userMonthId', ctrlUserMonths.outcomeUpdate);

// routes for dailyGamesData:
router.get('/dailyGamesData/:month', ctrlDailyGamesData.dailyGamesDataGetMonth);
router.post('/dailyGamesData', ctrlDailyGamesData.dailyGamesDataCreate);
router.put('/dailyGamesData/:date', ctrlDailyGamesData.dailyGamesDataUpdate);

// routes for authentication requests:
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//routes for messaging:
router.get('/messages', auth, ctrlMessages.getMessageLog);
router.put('/messages', auth, ctrlMessages.sendMessage);

module.exports = router;
