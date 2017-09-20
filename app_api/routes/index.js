'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const ctrlLeagues = require('../controllers/leagues');
const ctrlUserMonths = require('../controllers/user-months');
const ctrlDailyGamesData = require('../controllers/daily-games-data');
const ctrlMessages = require('../controllers/messages');
const ctrlAuth = require('../controllers/authentication');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  getToken: function (req) {
    if (req.headers.token) {
      return req.headers.token;
    } else if (req.body.token) {
      return req.body.token;
    } else if (req.cookies.token) {
      return req.cookies.token;
    } else {
      console.log('Couldn\'t find an authorization token');
      return null;
    }
  }
});

//routes for creating/joining leagues:
router.post('/league', auth, ctrlLeagues.leagueCreate);
router.post('/league/:leagueId', auth, ctrlLeagues.leagueJoin);
router.get('/league', auth, ctrlLeagues.leagueReadAllForUser);

// routes for calls to userMonths folder:
router.get('/userMonth/:month', auth, ctrlUserMonths.userMonthReadOne);
router.get('/userMonth', auth, ctrlUserMonths.userMonthReadAllForUser);
router.get('/userMonth/all/:month', auth, ctrlUserMonths.userMonthReadAllByMonth);
router.get('/userMonth/all-public/:month', auth, ctrlUserMonths.userMonthReadAllPublic);
router.post('/userMonth', auth, ctrlUserMonths.userMonthCreate);
router.delete('/userMonth/:userMonthId', auth, ctrlUserMonths.userMonthDelete);
router.put('/userMonth/:month/predictedWinners', auth, ctrlUserMonths.predictedWinnersUpdate);
router.put('/userMonth/:userMonthId', auth, ctrlUserMonths.outcomeUpdate);

// routes for dailyGamesData:
router.get('/dailyGamesData/:month', ctrlDailyGamesData.dailyGamesDataGetMonth);
router.post('/dailyGamesData', auth, ctrlDailyGamesData.dailyGamesDataCreate);
router.put('/dailyGamesData/:date', auth, ctrlDailyGamesData.dailyGamesDataUpdate);

// routes for authentication requests:
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//routes for messaging:
router.get('/messages', auth, ctrlMessages.getMessageLog);
router.put('/messages', auth, ctrlMessages.sendMessage);

module.exports = router;
