"use strict";

const mongoose = require("mongoose");
const moment = require("moment-timezone");
const _ = require("lodash");

const UserMonthModel = mongoose.model("UserMonth");
const UserModel = mongoose.model("User");
const updateData = require('./scorekeeping/main.js');

//don't run updateData more than once per minute:
const throttledUpdateData = _.throttle(updateData, 60*1000, { leading: true });

//return true if gameTime is after now
const gameTimeInFuture = function(gameTime) {
  //create moment in East time zone, from gameTime:
  let gameMoment = moment.tz(gameTime, "YYYY-MM-DD h:mm a", "America/New_York");

  //create moment from local time, then translate to ETC moment:
  let nowMoment = moment().tz("America/New_York");

  //summer mode:
  nowMoment = moment("2017-04-11T06:00:00-07:00").tz("America/New_York");

  return gameMoment.isAfter(nowMoment);
};

//redacts all users' predictions for games that haven't yet started
const hideFuturePredictions = function(userMonth) {
  const redactedWinners = userMonth.predictedWinners.toObject();

  _.forEach(redactedWinners, (day, key) => {
    if (day.teamName && gameTimeInFuture(day.gameTime)) {
      day.teamName = null;
    }
  });

  userMonth.predictedWinners = redactedWinners;
  return userMonth;
};

//given a userMonth and an outcome type ('success' or 'failure'), count the number of given outcomes
const countOutcomes = function(predictedWinners, outcomeType) {
  //converts from weird Mongoose object to iterable object:
  predictedWinners = predictedWinners.toObject();

  return _.reduce(
    predictedWinners,
    (sum, day, key) => {
      if (key === "_id") {
        return sum;
      } else {
        const increase = day.outcome && day.outcome === outcomeType ? 1 : 0;
        return sum + increase;
      }
    },
    0
  );
};

//helper function for composing responses as status codes (e.g. 404) with JSON files
const sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting user data from JWT
const getUserData = function(req, res, callback) {
  if (req.payload._id) {
    UserModel.findOne({ _id: req.payload._id }).exec(function(err, user) {
      if (!user) {
        sendJsonResponse(res, 404, {
          message: "User not found"
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
      message: "User not found"
    });
    return;
  }
};

/* GET one userMonth for an ownerId, month, league */
module.exports.userMonthReadOne = function(req, res) {
  getUserData(req, res, function(req, res, user) {
    const filter = {
      ownerId: user._id,
      month: req.params.month,
      leagueId: req.query.leagueId
    };
    UserMonthModel.find(filter).exec(function(err, userMonth) {
      let responseBody = {};
      if (!userMonth || userMonth.length === 0) {
        sendJsonResponse(res, 404, {
          message: "No userMonth found"
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

/* GET all userMonths for a single ownerId & league */
module.exports.userMonthReadAllForUser = function(req, res) {
  getUserData(req, res, function(req, res, user) {
    const filter = {
      ownerId: user._id,
      leagueId: req.query.leagueId
    };
    UserMonthModel.find(filter).exec(function(err, userMonthArray) {
      let responseBody = {};
      if (!userMonthArray) {
        sendJsonResponse(res, 404, {
          message: "No userMonths found"
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

/* GET all users' userMonths for given month & league */
module.exports.userMonthReadAllByMonth = function(req, res) {
  const filter = {
    month: req.params.month
  };
  UserMonthModel.find(filter).exec(function(err, userMonthArray) {
    let responseBody = {};

    if (!userMonthArray) {
      sendJsonResponse(res, 404, {
        message: "No userMonths found"
      });
      return;
    } else if (err) {
      console.log("Error: ", err);
      sendJsonResponse(res, 404, err);
      return;
    }

    responseBody = userMonthArray;

    sendJsonResponse(res, 200, responseBody);
  });
};

//GET all userMonths by month, and hide future predictions
module.exports.userMonthReadAllPublic = function(req, res) {
  throttledUpdateData();
  const filter = {
    month: req.params.month,
    leagueId: req.query.leagueId
  };

  UserMonthModel.find(filter).exec(function(err, userMonthArray) {
    let responseBody = {};

    if (!userMonthArray) {
      sendJsonResponse(res, 404, {
        message: "No userMonths found"
      });
      return;
    } else if (err) {
      console.log("Error: ", err);
      sendJsonResponse(res, 404, err);
      return;
    }

    userMonthArray.forEach(userMonth => hideFuturePredictions(userMonth));

    responseBody = userMonthArray;

    sendJsonResponse(res, 200, responseBody);
  });
};

/* POST a new userMonth */
module.exports.userMonthCreate = function(req, res) {
  getUserData(req, res, function(req, res, user) {
    UserMonthModel.create(
      {
        month: req.body.month,
        leagueId: req.body.leagueId,
        ownerId: user._id,
        ownerDisplayName: user.displayName,
        predictedWinners: {}
      },
      function(err, userMonth) {
        if (err) {
          console.log(err);
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 201, userMonth);
        }
      }
    );
  });
};

//  PUT make a prediction
module.exports.predictedWinnersUpdate = function(req, res) {
  //reject the prediction if the new game has already started:
  if (!gameTimeInFuture(req.body.gameTime)) {
    sendJsonResponse(res, 403, {
      message:
        "It's too late to update your prediction for this game; its start time has passed."
    });
    return;
  }

  getUserData(req, res, function(req, res, user) {
    if (!req.params.userMonthId) {
      sendJsonResponse(res, 404, {
        message: "Not found, userMonthId is required"
      });
      return;
    }

    const filter = {
      _id: req.params.userMonthId
    };

    UserMonthModel.find(filter)
      .select("predictedWinners")
      .exec(function(err, userMonth) {
        //check for basic errors:
        if (!userMonth) {
          sendJsonResponse(res, 404, {
            message: "userMonth not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        const dayNumber = req.body.dayNumber;
        const gameTime = req.body.gameTime;
        const predictedWinner = req.body.teamName || null;

        //reject the prediction if the existing pick has already started:
        if (userMonth[0].predictedWinners[dayNumber].gameTime) {
          if (
            !gameTimeInFuture(userMonth[0].predictedWinners[dayNumber].gameTime)
          ) {
            sendJsonResponse(res, 403, {
              message:
                "It's too late to update your prediction; the start time has passed."
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
        userMonth[0].save(function(err, userMonth) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            sendJsonResponse(res, 200, userMonth);
          }
        });
      });
  });
};

/* PUT mark a prediction as success or failure */
module.exports.outcomeUpdate = function(req, res) {
  getUserData(req, res, function(req, res, user) {
    //only allow admin users (like that run by the scorekeeping script) to mark outcomes
    if (user.role !== "admin") {
      sendJsonResponse(res, 403, {
        message: "Access forbidden: users cannot score game outcomes."
      });
      return;
    }
    const userMonthId = req.params.userMonthId;
    if (userMonthId) {
      UserMonthModel.findById(userMonthId)
        .select("predictedWinners")
        .exec(function(err, userMonth) {
          //catch basic errors:
          if (!userMonth) {
            sendJsonResponse(res, 404, {
              message: "userMonth not found"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }

          //add prediction outcome to provided day:
          if (req.body.day) {
            userMonth.predictedWinners[req.body.day].outcome =
              req.body.outcome || null;
          } else {
            sendJsonResponse(res, 404, {
              message: "no day provided"
            });
          }

          //update standingsData:
          userMonth.standingsData.winCount = countOutcomes(
            userMonth.predictedWinners,
            "success"
          );
          userMonth.standingsData.lossCount = countOutcomes(
            userMonth.predictedWinners,
            "failure"
          );

          //save userMonth and send JSON response:
          userMonth.save(function(err, userMonth) {
            if (err) {
              sendJsonResponse(res, 400, err);
            } else {
              sendJsonResponse(res, 200, userMonth);
            }
          });
        });
    } else {
      sendJsonResponse(res, 404, {
        message: "No userMonthId provided"
      });
    }
  });
};

/* DELETE a userMonth */
module.exports.userMonthDelete = function(req, res) {
  const userMonthId = req.params.userMonthId;
  if (userMonthId) {
    UserMonthModel.findByIdAndRemove(userMonthId).exec(function(
      err,
      userMonth
    ) {
      if (err) {
        console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      }

      console.log("userMonth id " + userMonthId + " deleted");
      sendJsonResponse(res, 204, null);
      return;
    });
  } else {
    sendJsonResponse(res, 404, {
      message: "No userMonthId"
    });
  }
};
