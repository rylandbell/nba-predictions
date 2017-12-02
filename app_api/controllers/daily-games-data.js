const mongoose = require("mongoose");

const DailyGamesDataModel = mongoose.model("DailyGamesData");
const { sendJsonResponse, getUserDataNew } = require("./helpers");

/* GET one month of dailyGamesData by month */
module.exports.dailyGamesDataGetMonth = async function(req, res) {
  if (!req.params && req.params.month) {
    throw new APIException(res, 400, "No month found in request.");
  }

  const monthlyData = await DailyGamesDataModel.find({
    month: req.params.month
  });

  if (!monthlyData) {
    throw new APIException(res, 404, "No games data found.");
  }

  sendJsonResponse(res, 200, monthlyData);
};

/* POST a new dailyGamesData */
module.exports.dailyGamesDataCreate = async function(req, res) {
  const savedGamesData = await DailyGamesDataModel.create({
    month: req.body.month,
    date: req.body.date,
    gameSummaries: req.body.gameSummaries
  });

  sendJsonResponse(res, 201, savedGamesData);
};

/* PUT: update a dailyGamesData (once game scores are available) */
module.exports.dailyGamesDataUpdate = async function(req, res) {
  const user = await getUserDataNew(req, res);
  if (user.role !== "admin") {
    throw new APIException(
      res,
      403,
      "Access forbidden: users cannot score game outcomes."
    );
  }

  const dailyGamesData = await DailyGamesDataModel.findOne({
    date: req.params.date
  });

  if (!dailyGamesData) {
    throw new APIException(res, 404, "No games data found.");
  } else {
    dailyGamesData.gameSummaries = req.body.gameSummaries;
    const savedData = await dailyGamesData.save();
    sendJsonResponse(res, 200, savedData);
  }
};
