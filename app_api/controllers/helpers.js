const mongoose = require("mongoose");
const moment = require("moment-timezone");
const _ = require("lodash");

const UserModel = mongoose.model("User");

//helper function for composing responses as status codes (e.g. 404) with JSON files
const sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//constructor for exceptions designed to be translated to JSON responses
const APIException = function(res, statusCode, message) {
  this.res = res;
  this.statusCode = statusCode;
  this.message = message;
};

//add catch block to API controllers to create JSON response from caught API Exceptions
const catchErrors = function(fn) {
  console.log(fn);
  return function(...args) {
    return fn(...args).catch(e => {
      if (e.statusCode && e.message) {
        // catch APIException objects
        console.log(`${e.statusCode} error: ${e.message}`);
        sendJsonResponse(e.res, e.statusCode, {
          message: e.message
        });
      } else {
        // catch Error objects
        console.log(`Error: ${e.message}`);
        sendJsonResponse(e.res, 500, {
          message: e.message
        });
      }
    });
  };
};

//helper function for getting user data from JWT
const getUserData = async function(req, res, callback) {
  if (!req.payload._id) {
    throw new APIException(res, 400, "No user ID in request.");
  }
  
  const user = await UserModel.findOne({ _id: req.payload._id });
  
  if (!user) {
    throw new APIException(res, 404, "User not found");
  } else {
    callback(req, res, user);
  }
};

const getUserDataNew = async function(req, res) {
  if (!req.payload._id) {
    throw new APIException(res, 400, "No user ID in request.");
  }
  
  const user = await UserModel.findOne({ _id: req.payload._id });
  
  if (!user) {
    throw new APIException(res, 404, "User not found");
  } else {
    return user;
  }
};

//return true if gameTime is after now
const gameTimeInFuture = function(gameTime) {
  //create moment in East time zone, from gameTime:
  let gameMoment = moment.tz(gameTime, "YYYY-MM-DD h:mm a", "America/New_York");

  //create moment from local time, then translate to ETC moment:
  let nowMoment = moment().tz("America/New_York");

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

module.exports = {
  sendJsonResponse,
  APIException,
  catchErrors,
  getUserData,
  getUserDataNew,
  hideFuturePredictions,
  gameTimeInFuture,
  countOutcomes
};
