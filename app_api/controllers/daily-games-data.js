'use strict';
const mongoose = require('mongoose');

const DailyGamesDataModel = mongoose.model('DailyGamesData');
const UserModel = mongoose.model('User');

//helper function for composing responses as status codes (e.g. 404) with JSON files
const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting user data from JWT
const getUserData = function (req, res, callback) {
  if (req.payload._id) {
    UserModel
      .findOne({ _id: req.payload._id })
      .exec(function (err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            message: 'User not found'
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }

        callback(req, res, user);
      });

  } else {
    sendJsonResponse(res, 404, {
      message: 'User not found'
    });
    return;
  }
};

/* GET one month of dailyGamesData by month */
module.exports.dailyGamesDataGetMonth = function (req, res) {
  if (req.params && req.params.month) {
    DailyGamesDataModel
      .find({ month: req.params.month })
      .exec(function (err, monthlyData) {
        let responseBody;
        if (!monthlyData) {
          sendJsonResponse(res, 404, {
            message: 'no data found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }

        responseBody = monthlyData;
        sendJsonResponse(res, 200, responseBody);
      });
  } else {
    console.log('No month specified');
    sendJsonResponse(res, 404, {
      message: 'No month in request'
    });
  }
};

/* POST a new dailyGamesData */
module.exports.dailyGamesDataCreate = function (req, res) {
  DailyGamesDataModel.create({
    month: req.body.month,
    date: req.body.date,
    gameSummaries: req.body.gameSummaries
  }, function (err, dailyGamesData) {
    if (err) {
      console.log('error in controller');
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, dailyGamesData);
    }
  });
};

/* PUT: update a dailyGamesData (once game scores are available) */
module.exports.dailyGamesDataUpdate = function (req, res) {
  getUserData(req, res, function (req, res, user) {
    //only allow admin users (like that run by the scorekeeping script) to update scores
    if (user.role !== 'admin') {
      sendJsonResponse(res, 403, {
        message: 'Access forbidden: users cannot score game outcomes.'
      });
      return;
    }

    DailyGamesDataModel.find({
      date: req.params.date,
    }, function (err, dailyGamesData) {
      if (err) {
        console.log('error in controller');
        sendJsonResponse(res, 400, err);
        return;
      } else if (!dailyGamesData) {
        sendJsonResponse(res, 404, {
          message: 'date not found'
        });
        return;
      } else if (dailyGamesData.length === 0) {
        sendJsonResponse(res, 200, dailyGamesData);
        return;
      } else {
        dailyGamesData[0].gameSummaries = req.body.gameSummaries;
        dailyGamesData[0].save(function (err, dailyGamesData) {
          if (err) {
            sendJsonResponse(res, 400, err);
            return;
          } else {
            sendJsonResponse(res, 200, dailyGamesData);
            return;
          }
        });
      }
    });
  });
};