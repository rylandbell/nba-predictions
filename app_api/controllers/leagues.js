const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const _ = require("lodash");
const Moniker = require("moniker");

const UserModel = mongoose.model("User");
const LeagueModel = mongoose.model("League");
const MessageLogModel = mongoose.model("MessageLog");
const { sendJsonResponse, getUserData } = require("./helpers");

/* GET a user's data, including a list of leagues */
module.exports.leagueReadAllForUser = function(req, res) {
  getUserData(req, res, (req, res, user) => {
    if (!user) {
      sendJsonResponse(res, 404, {
        message: "No user found"
      });
      return;
    }

    const responseBody = {
      username: user.username,
      displayName: user.displayName,
      leagues: user.leagues
    };

    sendJsonResponse(res, 200, responseBody);
  });
};

/* POST create a new league */
module.exports.leagueCreate = function(req, res) {
  const randomPhrase = Moniker.generator([Moniker.adjective, Moniker.noun], {
    glue: " "
  }).choose();
  getUserData(req, res, (req, res, user) => {
    LeagueModel.create({
      name: req.body.name,
      joinPhrase: randomPhrase
    })
      .then(league => {
        //find the user object for current user
        UserModel.findOne(
          {
            _id: user._id
          },
          (err, user) => {
            //check for basic errors
            if (!user) {
              sendJsonResponse(res, 404, {
                message: "user not found"
              });
              return;
            } else if (err) {
              sendJsonResponse(res, 400, err);
              return;
            }

            //add the new league ID to the user object
            user.leagues.push({
              id: league._id,
              name: league.name,
              joinPhrase: randomPhrase
            });

            //save
            user.save((err, user) => {
              if (err) {
                sendJsonResponse(res, 400, err);
              } else {
                sendJsonResponse(res, 200, user);
              }
            });
          }
        );

        console.log(league._id);
        //create a message log for the new league:
        MessageLogModel.create({ leagueId: league._id }).catch(console.log);
      })
      .catch(err => {
        console.log("error in controller");
        sendJsonResponse(res, 400, err);
      });
  });
};

/* POST join a league by ID */
module.exports.leagueJoin = function(req, res) {
  if (!req.params.joinPhrase) {
    sendJsonResponse(res, 404, {
      message: "Error: pass phrase is required to join"
    });
    return;
  }
  getUserData(req, res, (req, res, user) => {
    //find the user object for current user
    UserModel.findOne(
      {
        _id: user._id
      },
      (err, user) => {
        //check for basic errors
        if (!user) {
          sendJsonResponse(res, 404, {
            message: "user not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        //don't add multiple entries for same league:
        const leagueIndex = _.findIndex(user.leagues, {
          joinPhrase: req.params.joinPhrase
        });
        if (leagueIndex > -1) {
          sendJsonResponse(res, 400, {
            message: "User already belongs to this league."
          });
          return;
        }

        //check that the league actually exists, and get its name:
        const joinPhrase = req.params.joinPhrase.trim();
        LeagueModel.findOne({
          joinPhrase: joinPhrase
        }).exec((err, league) => {
          if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }

          if (!league) {
            sendJsonResponse(res, 400, {
              message: "No league found for that pass phrase."
            });
            return;
          }

          //add the new league to the user object
          user.leagues.push({
            id: league.id,
            name: league.name,
            joinPhrase: league.joinPhrase
          });

          //save
          user.save((err, user) => {
            if (err) {
              sendJsonResponse(res, 400, err);
            } else {
              sendJsonResponse(res, 200, user);
            }
          });
        });
      }
    );
  });
};
