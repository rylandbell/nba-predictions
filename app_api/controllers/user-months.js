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

/* GET one userMonth by userMonthId */
module.exports.userMonthReadOne = function (req, res) {
  getOwnerData(req, res, function (req, res, owner) {

    //I'll need to wrap all this in an if-exists block if I reference anything from req.params (like month)
    var filter = {
      ownerId: owner._id,
      month: '2016-11'
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

/* POST a new userMonth */
module.exports.userMonthCreate = function (req, res) {
  UserMonthModel.create({
    month: req.body.month,
    ownerId: req.body.ownerId,
    predictedWinners: {}
  }, function (err, userMonth) {
    if (err) {
      console.log(err);
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, userMonth);
    }
  });
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
