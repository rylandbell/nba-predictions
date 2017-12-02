const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const _ = require("lodash");
const moniker = require("moniker");

const UserModel = mongoose.model("User");
const LeagueModel = mongoose.model("League");
const MessageLogModel = mongoose.model("MessageLog");
const { sendJsonResponse, getUserDataNew, APIException } = require("./helpers");

/* GET a user's data, including a list of leagues */
module.exports.leagueReadAllForUser = async function(req, res) {
  const user = await getUserDataNew(req, res);

  const responseBody = {
    username: user.username,
    displayName: user.displayName,
    leagues: user.leagues
  };

  sendJsonResponse(res, 200, responseBody);
};

/* POST create a new league */
module.exports.leagueCreate = async function(req, res) {
  // create a pass phrase for the league
  const randomPhrase = moniker
    .generator([moniker.adjective, moniker.noun], {
      glue: " "
    })
    .choose();

  // create a league, and a message log for the league
  const league = await LeagueModel.create({
    name: req.body.name,
    joinPhrase: randomPhrase
  });
  await MessageLogModel.create({ leagueId: league._id });

  //add the new league ID to the user object
  const user = await getUserDataNew(req, res);
  user.leagues.push({
    id: league._id,
    name: league.name,
    joinPhrase: randomPhrase
  });
  const savedUser = await user.save();

  sendJsonResponse(res, 200, savedUser);
};

/* POST join a league by ID */
module.exports.leagueJoin = async function(req, res) {
  if (!req.params.joinPhrase) {
    throw new APIException(res, 404, "pass phrase is required to join");
  }

  const user = await getUserDataNew(req, res);

  //don't add multiple entries for same league:
  const leagueIndex = _.findIndex(user.leagues, {
    joinPhrase: req.params.joinPhrase
  });
  if (leagueIndex > -1) {
    throw new APIException(res, 400, "User already belongs to this league.");
  }

  //check that the league actually exists, and get its name:
  const joinPhrase = req.params.joinPhrase.trim();
  const league = await LeagueModel.findOne({
    joinPhrase: joinPhrase
  });
  if (!league) {
    throw new APIException(res, 400, "No league found for that pass phrase.");
  }

  //add the new league to the user object
  user.leagues.push({
    id: league.id,
    name: league.name,
    joinPhrase: league.joinPhrase
  });

  //save the user
  const savedUser = await user.save();
  sendJsonResponse(res, 200, user);
};
