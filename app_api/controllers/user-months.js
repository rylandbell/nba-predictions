var mongoose = require('mongoose');
var UserMonthModel = mongoose.model('UserMonth');

//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//Response functions for CRUD operations on userMonths

/* GET one task by userMonthId */
module.exports.userMonthsReadOne = function (req, res) {
  if (req.params && req.params.userMonthId) {
    UserMonthModel
      .findById(req.params.userMonthId)
      .exec(function (err, task) {
        var responseBody = {};
        if (!task) {
          sendJsonResponse(res, 404, {
            message: 'userMonthId not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }

        responseBody.task = task;
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
module.exports.userMonthsCreate = function (req, res) {
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
