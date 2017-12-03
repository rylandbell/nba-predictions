const mongoose = require("mongoose");

const UserMonthModel = mongoose.model("UserMonth");
const {
  sendJsonResponse,
  getUserData,
  gameTimeInFuture,
  hideFuturePredictions,
  countOutcomes,
  APIException
} = require("./helpers");

/* GET one userMonth for an ownerId, month, league */
module.exports.userMonthReadOne = async function(req, res) {
  const user = await getUserData(req, res);
  const filter = {
    ownerId: user._id,
    month: req.params.month,
    leagueId: req.query.leagueId
  };
  const userMonth = await UserMonthModel.findOne(filter);
  sendJsonResponse(res, 200, { userMonth });
};

/* GET all userMonths for a single ownerId & league */
module.exports.userMonthReadAllForUser = async function(req, res) {
  const user = await getUserData(req, res);
  const filter = {
    ownerId: user._id,
    leagueId: req.query.leagueId
  };
  const userMonthArray = await UserMonthModel.find(filter);
  sendJsonResponse(res, 200, { userMonthArray });
};

/* GET all users' userMonths for given month (used in scorekeeping)*/
module.exports.userMonthReadAllByMonth = async function(req, res) {
  const filter = {
    month: req.params.month
  };
  const userMonthArray = await UserMonthModel.find(filter);
  sendJsonResponse(res, 200, userMonthArray);
};

//GET all userMonths by month, and hide future predictions
module.exports.userMonthReadAllPublic = async function(req, res) {
  const filter = {
    month: req.params.month,
    leagueId: req.query.leagueId
  };

  // get the AI player's userMonth for the given month
  const filterAI = {
    month: req.params.month,
    leagueId: process.env.AI_LEAGUE_ID
  };

  const userMonthArray = await UserMonthModel.find({
    $or: [filter, filterAI]
  });

  // redact future picks
  userMonthArray.forEach(userMonth => hideFuturePredictions(userMonth));

  sendJsonResponse(res, 200, userMonthArray);
};

/* POST a new userMonth */
module.exports.userMonthCreate = async function(req, res) {
  // Human userMonths are created with empty predictedWinners, but computer players submit
  // picks upon creation
  const predictedWinners = req.body.predictedWinners || {};

  const user = await getUserData(req, res);
  const userMonth = await UserMonthModel.create({
    month: req.body.month,
    leagueId: req.body.leagueId,
    ownerId: user._id,
    ownerDisplayName: user.displayName,
    predictedWinners: predictedWinners
  });

  sendJsonResponse(res, 200, [userMonth]);
};

//  PUT make a prediction
module.exports.predictedWinnersUpdate = async function(req, res) {
  if (!req.params.userMonthId) {
    throw new APIException(res, 400, "userMonthId is required");
  }

  //reject the prediction if the new game has already started:
  if (!gameTimeInFuture(req.body.gameTime)) {
    throw new APIException(
      res,
      403,
      "It's too late to update your prediction for this game; its start time has passed."
    );
  }

  const filter = {
    _id: req.params.userMonthId
  };
  const { dayNumber, gameTime } = req.body;
  const predictedWinner = req.body.teamName || null;

  const user = await getUserData(req, res);
  const userMonth = await UserMonthModel.findOne(filter);
  const { predictedWinners } = userMonth;

  //reject the prediction if the existing pick has already started:
  if (
    predictedWinners[dayNumber].gameTime &&
    !gameTimeInFuture(predictedWinners[dayNumber].gameTime)
  ) {
    throw new APIException(
      res,
      403,
      "It's too late to update your prediction; the start time has passed."
    );
  }

  //add the prediction data from req:
  if (predictedWinner) {
    predictedWinners[dayNumber].teamName = predictedWinner;
    predictedWinners[dayNumber].gameTime = gameTime;
  } else {
    predictedWinners[dayNumber].teamName = null;
    predictedWinners[dayNumber].gameTime = null;
  }

  const savedUserMonth = await userMonth.save();
  sendJsonResponse(res, 200, savedUserMonth);
};

/* PUT mark a prediction as success or failure */
module.exports.outcomeUpdate = async function(req, res) {
  const userMonthId = req.params.userMonthId;
  if (!userMonthId) {
    throw new APIException(res, 400, "No userMonthId provided");
  }

  const user = await getUserData(req, res);

  //only allow admin users (like that run by the scorekeeping script) to mark outcomes
  if (user.role !== "admin") {
    throw new APIException(
      res,
      403,
      "Access forbidden: users cannot score game outcomes."
    );
  }

  const userMonth = await UserMonthModel.findById(userMonthId);

  //add prediction outcome to provided day:
  if (req.body.day) {
    userMonth.predictedWinners[req.body.day].outcome = req.body.outcome || null;
  } else {
    throw new APIException(res, 400, "No day provided");
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

  const savedUserMonth = await userMonth.save();
  sendJsonResponse(res, 200, savedUserMonth);
};
