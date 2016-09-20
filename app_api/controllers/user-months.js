var mongoose = require('mongoose');
var UserMonthModel = mongoose.model('UserMonth');

//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//Response functions for CRUD operations on userMonths

/* GET one userMonth by userMonthId */
module.exports.userMonthReadOne = function (req, res) {
  if (req.params && req.params.userMonthId) {
    UserMonthModel
      .findById(req.params.userMonthId)
      .exec(function (err, userMonth) {
        var responseBody = {};
        if (!userMonth) {
          sendJsonResponse(res, 404, {
            message: 'userMonthId not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }

        responseBody.userMonth = userMonth;
        sendJsonResponse(res, 200, responseBody);
      });
  } else {
    console.log('No userMonthId specified');
    sendJsonResponse(res, 404, {
      message: 'No userMonthId in request'
    });
  }
};

/* POST a new userMonth */
module.exports.userMonthCreate = function (req, res) {
  UserMonthModel.create({
    month: req.body.month,
    eligibleTeams: {},
    predictedWinners: {}
  }, function (err, userMonth) {
    if (err) {
      console.log(err);
      sendJsonResponse(res, 400, err);
    } else {
      console.log(userMonth);
      sendJsonResponse(res, 201, userMonth);
    }
  });
};

/* DELETE a userMonth */
module.exports.userMonthDelete = function(req, res) {
  var userMonthId = req.params.userMonthId;
  if (userMonthId) {
    UserMonthModel
      .findByIdAndRemove(userMonthId)
      .exec(
        function(err, userMonth) {
          if (err) {
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
          }
          console.log("userMonth id " + userMonthId + " deleted");
          sendJsonResponse(res, 204, null);
          return;
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No userMonthId"
    });
  }
};