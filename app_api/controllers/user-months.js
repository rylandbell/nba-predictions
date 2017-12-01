const mongoose = require("mongoose");

const UserMonthModel = mongoose.model("UserMonth");
const {
  sendJsonResponse,
  getUserData,
  gameTimeInFuture,
  hideFuturePredictions,
  countOutcomes
} = require("./helpers");

/* GET one userMonth for an ownerId, month, league */
module.exports.userMonthReadOne = function(req, res) {
  getUserData(req, res, (req, res, user) => {
    const filter = {
      ownerId: user._id,
      month: req.params.month,
      leagueId: req.query.leagueId
    };
    UserMonthModel.find(filter).exec((err, userMonth) => {
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
  getUserData(req, res, (req, res, user) => {
    const filter = {
      ownerId: user._id,
      leagueId: req.query.leagueId
    };
    UserMonthModel.find(filter).exec((err, userMonthArray) => {
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
  UserMonthModel.find(filter).exec((err, userMonthArray) => {
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
  const filter = {
    month: req.params.month,
    leagueId: req.query.leagueId
  };

  // get the AI player's userMonth for the given month
  const filterAI = {
    month: req.params.month,
    leagueId: process.env.AI_LEAGUE_ID
  };

  UserMonthModel.find({
    $or: [filter, filterAI]
  }).exec((err, userMonthArray) => {
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
  // Human userMonths are created with empty predictedWinners, but computer players submit
  // picks upon creation
  const predictedWinners = req.body.predictedWinners || {};

  getUserData(req, res, (req, res, user) => {
    UserMonthModel.create(
      {
        month: req.body.month,
        leagueId: req.body.leagueId,
        ownerId: user._id,
        ownerDisplayName: user.displayName,
        predictedWinners: predictedWinners
      },
      (err, userMonth) => {
        if (err) {
          console.log(err);
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 201, [userMonth]);
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

  getUserData(req, res, (req, res, user) => {
    if (!req.params.userMonthId) {
      sendJsonResponse(res, 404, {
        message: "Not found, userMonthId is required"
      });
      return;
    }

    const filter = {
      _id: req.params.userMonthId
    };

    UserMonthModel.find(filter).exec((err, userMonth) => {
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
      userMonth[0].save((err, userMonth) => {
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
  getUserData(req, res, (req, res, user) => {
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
        .exec((err, userMonth) => {
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
          userMonth.save((err, userMonth) => {
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
    UserMonthModel.findByIdAndRemove(userMonthId).exec((err, userMonth) => {
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
