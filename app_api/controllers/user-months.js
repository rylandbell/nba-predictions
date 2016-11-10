'use strict';

var mongoose = require('mongoose');
var moment = require('moment-timezone');
var _ = require('lodash');

var UserMonthModel = mongoose.model('UserMonth');
var UserModel = mongoose.model('User');

//return true if gameTime is after now
const gameTimeInFuture = function (gameTime) {

  //create moment in East time zone, from gameTime:
  let gameMoment = moment.tz(gameTime, 'YYYY-MM-DD h:mm a', 'America/New_York');

  //create moment from local time, then translate to ETC moment:
  let nowMoment = moment().tz('America/New_York');

  return gameMoment.isAfter(nowMoment);
};

//redacts all users' predictions for games that haven't yet started
const  hideFuturePredictions = function (userMonth) {
  const redactedWinners = userMonth.predictedWinners.toObject();

  _.forEach(redactedWinners,
    (day, key) => {
      if (day.teamName && gameTimeInFuture(day.gameTime)) {
        day.teamName = null;
      }
    }
  );

  userMonth.predictedWinners = redactedWinners;
  return userMonth;
};

//given a userMonth and an outcome type ('success' or 'failure'), count the number of given outcomes
const countOutcomes = function (predictedWinners, outcomeType) {

  //converts from weird Mongoose object to iterable object:
  predictedWinners = predictedWinners.toObject();

  return _.reduce(predictedWinners,
    (sum, day, key) => {
      if (key === '_id') {
        return sum;
      } else {
        var increase = day.outcome && day.outcome === outcomeType ? 1 : 0;
        return sum + increase;
      }
    },

    0
  );
};

//helper function for composing responses as status codes (e.g. 404) with JSON files
const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting author data from JWT
const getOwnerData = function (req, res, callback) {
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

/* GET one userMonth ownerId, month */
module.exports.userMonthReadOne = function (req, res) {
  getOwnerData(req, res, function (req, res, owner) {
    var filter = {
      ownerId: owner._id,
      month: req.params.month
    };
    UserMonthModel
      .find(filter)
      .exec(function (err, userMonth) {

        var responseBody = {};
        if (!userMonth || userMonth.length === 0) {
          sendJsonResponse(res, 404, {
            message: 'No userMonth found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }

        responseBody.userMonth = userMonth[0];

        sendJsonResponse(res, 200, responseBody);
      });
  });
};

/* GET all userMonths for ownerId */
module.exports.userMonthReadAllForUser = function (req, res) {
  getOwnerData(req, res, function (req, res, owner) {
    var filter = {
      ownerId: owner._id
    };
    UserMonthModel
      .find(filter)
      .exec(function (err, userMonthArray) {

        var responseBody = {};
        if (!userMonthArray) {
          sendJsonResponse(res, 404, {
            message: 'No userMonths found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }

        responseBody.userMonthArray = userMonthArray;

        sendJsonResponse(res, 200, responseBody);
      });
  });
};

/* GET all userMonths for given month */
module.exports.userMonthReadAllByMonth = function (req, res) {
  var filter = {
    month: req.params.month
  };

  UserMonthModel
    .find(filter)
    .exec(function (err, userMonthArray) {
      var responseBody = {};

      if (!userMonthArray) {
        sendJsonResponse(res, 404, {
          message: 'No userMonths found'
        });
        return;
      } else if (err) {
        console.log('Error: ', err);
        sendJsonResponse(res, 404, err);
        return;
      }

      responseBody = userMonthArray;

      sendJsonResponse(res, 200, responseBody);
    });
};

//GET all userMonths by month, and hide future predictions
module.exports.userMonthReadAllPublic = function (req, res) {
  var filter = {
    month: req.params.month
  };

  UserMonthModel
    .find(filter)
    .exec(function (err, userMonthArray) {
      var responseBody = {};

      if (!userMonthArray) {
        sendJsonResponse(res, 404, {
          message: 'No userMonths found'
        });
        return;
      } else if (err) {
        console.log('Error: ', err);
        sendJsonResponse(res, 404, err);
        return;
      }

      userMonthArray.forEach(userMonth => hideFuturePredictions(userMonth));

      responseBody = userMonthArray;

      sendJsonResponse(res, 200, responseBody);
    });
};

/* POST a new userMonth */
module.exports.userMonthCreate = function (req, res) {
  getOwnerData(req, res, function (req, res, owner) {
    UserMonthModel.create({
      month: req.body.month,
      ownerId: owner._id,
      ownerDisplayName: owner.displayName,
      predictedWinners: {}
    }, function (err, userMonth) {
      if (err) {
        console.log(err);
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, userMonth);
      }
    });
  });
};

//  PUT make a prediction
module.exports.predictedWinnersUpdate = function (req, res) {

  //reject the prediction if the new game has already started:
  if (!gameTimeInFuture(req.body.gameTime)) {
    sendJsonResponse(res, 403, {
      message: 'It\'s too late to update your prediction for this game; its start time has passed.'
    });
    return;
  }

  getOwnerData(req, res, function (req, res, owner) {
    if (!req.params.month) {
      sendJsonResponse(res, 404, {
        message: 'Not found, month name is required'
      });
      return;
    }

    var filter = {
      ownerId: owner._id,
      month: req.params.month
    };

    UserMonthModel
      .find(filter)
      .select('predictedWinners')
      .exec(
        function (err, userMonth) {

          //check for basic errors:
          if (!userMonth) {
            sendJsonResponse(res, 404, {
              message: 'userMonth not found'
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }

          var dayNumber = req.body.dayNumber;
          var gameTime = req.body.gameTime;
          var predictedWinner = req.body.teamName || null;

          //reject the prediction if the existing pick has already started:
          if (userMonth[0].predictedWinners[dayNumber].gameTime) {
            if (!gameTimeInFuture(userMonth[0].predictedWinners[dayNumber].gameTime)) {
              sendJsonResponse(res, 403, {
                message: 'It\'s too late to update your prediction; the start time has passed.'
              });
              return;
            }
          }

          //add the prediction data from req:
          if (predictedWinner) {
            userMonth[0].predictedWinners[dayNumber].teamName = predictedWinner;
            userMonth[0].predictedWinners[dayNumber].gameTime = gameTime;
          } else {
            userMonth[0].predictedWinners[dayNumber].teamName = null;
            userMonth[0].predictedWinners[dayNumber].gameTime = null;
          }

          //save the userMonth;
          userMonth[0].save(function (err, userMonth) {
            if (err) {
              sendJsonResponse(res, 400, err);
            } else {
              sendJsonResponse(res, 200, userMonth);
            }
          });
        }
    );
  });
};

/* PUT mark a prediction as success or failure */
module.exports.outcomeUpdate = function (req, res) {
  var userMonthId = req.params.userMonthId;
  if (userMonthId) {
    UserMonthModel
      .findById(userMonthId)
      .select('predictedWinners')
      .exec(
        function (err, userMonth) {

          //catch basic errors:
          if (!userMonth) {
            sendJsonResponse(res, 404, {
              message: 'userMonth not found'
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }

          //add prediction outcome to provided day:
          if (req.body.day) {
            userMonth.predictedWinners[req.body.day].outcome = req.body.outcome || null;
          } else {
            sendJsonResponse(res, 404, {
              message: 'no day provided'
            });
          }

          //update standingsData:
          userMonth.standingsData.winCount = countOutcomes(userMonth.predictedWinners, 'success');
          userMonth.standingsData.lossCount = countOutcomes(userMonth.predictedWinners, 'failure');

          //save userMonth and send JSON response:
          userMonth.save(function (err, userMonth) {
            if (err) {
              sendJsonResponse(res, 400, err);
            } else {
              sendJsonResponse(res, 200, userMonth);
            }
          });
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      message: 'No userMonthId provided'
    });
  }
};

/* DELETE a userMonth */
module.exports.userMonthDelete = function (req, res) {
  var userMonthId = req.params.userMonthId;
  if (userMonthId) {
    UserMonthModel
      .findByIdAndRemove(userMonthId)
      .exec(
        function (err, userMonth) {
          if (err) {
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
          }

          console.log('userMonth id ' + userMonthId + ' deleted');
          sendJsonResponse(res, 204, null);
          return;
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      message: 'No userMonthId'
    });
  }
};
