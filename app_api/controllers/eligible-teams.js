var mongoose = require('mongoose');
var UserMonthModel = mongoose.model('UserMonth');

//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

// PUT update the eligible-teams list
module.exports.eligibleTeamsUpdate = function (req, res) {

  if (!req.params.userMonthId) {
    sendJsonResponse(res, 404, {
      message: 'Not found, userMonthId and eligibleTeamsId are both required'
    });
    return;
  }

  UserMonthModel
    .findById(req.params.userMonthId)
    .select('eligibleTeams')
    .exec(
      function (err, userMonth) {

        //because there's only one eligibleTeams subdocument per userMonth, I don't need to search for a particular one by id
        if (!userMonth) {
          sendJsonResponse(res, 404, {
            message: 'userMonthId not found'
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        for (var key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            userMonth.eligibleTeams[key] = req.body[key];
          }
        }

        userMonth.save(function (err, userMonth) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            sendJsonResponse(res, 200, userMonth);
          }
        });
      }
  );
};
