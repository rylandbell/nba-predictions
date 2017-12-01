const mongoose = require("mongoose");

const DailyGamesDataModel = mongoose.model("DailyGamesData");
const { sendJsonResponse, getUserData } = require("./helpers");

/* GET one month of dailyGamesData by month */
module.exports.dailyGamesDataGetMonth = function(req, res) {
  if (req.params && req.params.month) {
    DailyGamesDataModel.find({
      month: req.params.month
    }).exec((err, monthlyData) => {
      let responseBody;
      if (!monthlyData) {
        sendJsonResponse(res, 404, {
          message: "no data found"
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
    console.log("No month specified");
    sendJsonResponse(res, 404, {
      message: "No month in request"
    });
  }
};

/* POST a new dailyGamesData */
module.exports.dailyGamesDataCreate = function(req, res) {
  DailyGamesDataModel.create(
    {
      month: req.body.month,
      date: req.body.date,
      gameSummaries: req.body.gameSummaries
    },
    (err, dailyGamesData) => {
      if (err) {
        console.log("error in controller");
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, dailyGamesData);
      }
    }
  );
};

/* PUT: update a dailyGamesData (once game scores are available) */
module.exports.dailyGamesDataUpdate = function(req, res) {
  getUserData(req, res, (req, res, user) => {
    //only allow admin users (like that run by the scorekeeping script) to update scores
    if (user.role !== "admin") {
      sendJsonResponse(res, 403, {
        message: "Access forbidden: users cannot score game outcomes."
      });
      return;
    }

    DailyGamesDataModel.find(
      {
        date: req.params.date
      },
      (err, dailyGamesData) => {
        if (err) {
          console.log("error in controller");
          sendJsonResponse(res, 400, err);
          return;
        } else if (!dailyGamesData) {
          sendJsonResponse(res, 404, {
            message: "date not found"
          });
          return;
        } else if (dailyGamesData.length === 0) {
          sendJsonResponse(res, 200, dailyGamesData);
          return;
        } else {
          dailyGamesData[0].gameSummaries = req.body.gameSummaries;
          dailyGamesData[0].save((err, dailyGamesData) => {
            if (err) {
              sendJsonResponse(res, 400, err);
              return;
            } else {
              sendJsonResponse(res, 200, dailyGamesData);
              return;
            }
          });
        }
      }
    );
  });
};
