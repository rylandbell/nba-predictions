var mongoose = require('mongoose');
var DailyGamesDataModel = mongoose.model('DailyGamesData');

//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET one userMonth by userMonthId */
module.exports.dailyGamesDataGetMonth = function (req, res) {
  if (req.params && req.params.month) {
    DailyGamesDataModel
      .find({ month: req.params.month })
      .exec(function (err, monthlyData) {
        var responseBody = {};
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

// /* DELETE a userMonth */
// module.exports.userMonthDelete = function(req, res) {
//   var userMonthId = req.params.userMonthId;
//   if (userMonthId) {
//     UserMonthModel
//       .findByIdAndRemove(userMonthId)
//       .exec(
//         function(err, userMonth) {
//           if (err) {
//             console.log(err);
//             sendJsonResponse(res, 404, err);
//             return;
//           }
//           console.log("userMonth id " + userMonthId + " deleted");
//           sendJsonResponse(res, 204, null);
//           return;
//         }
//     );
//   } else {
//     sendJSONresponse(res, 404, {
//       "message": "No userMonthId"
//     });
//   }
// };
