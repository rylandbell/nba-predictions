var mongoose = require('mongoose');
var UserMonthModel = mongoose.model('UserMonth');
var UserModel = mongoose.model('User');

//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting author data from JWT
var getOwnerData = function (req, res, callback) {
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
        console.log("Error: ", err);
        sendJsonResponse(res, 404, err);
        return;
      }

      responseBody.userMonthArray = userMonthArray;

      sendJsonResponse(res, 200, responseBody);
    });
  
};

/* POST a new userMonth */
module.exports.userMonthCreate = function (req, res) {
  getOwnerData(req, res, function (req, res, owner) {
    UserMonthModel.create({
      month: req.body.month,
      ownerId: owner._id,
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

//  PUT update the predictedWinners list
module.exports.predictedWinnersUpdate = function (req, res) {
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
          if (!userMonth) {
            sendJsonResponse(res, 404, {
              message: 'userMonth not found'
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }

          //the key is a number from 1-31; there's only one, but since I don't know what it will be ahead of time, I run through this loop:
          for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
              if (req.body[key] === 'null') {
                userMonth[0].predictedWinners[key].teamName = null;
              } else {
                userMonth[0].predictedWinners[key].teamName = req.body[key];
              }
            }
          }

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
