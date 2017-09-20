"use strict";
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const _ = require('lodash');

const UserModel = mongoose.model("User");
const LeagueModel = mongoose.model("League");

//helper function for composing responses as status codes (e.g. 404) with JSON files
const sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting user data from JWT
const getUserData = function(req, res, callback) {
  if (req.payload._id) {
    UserModel.findOne({ _id: req.payload._id }).exec(function(err, user) {
      if (!user) {
        sendJsonResponse(res, 404, {
          message: "User not found"
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
      message: "User not found"
    });
    return;
  }
};

/* GET a user's data, including a list of leagues */
module.exports.leagueReadAllForUser = function (req, res) {
  getUserData(req, res, function (req, res, user) {
    if (!user) {
      sendJsonResponse(res, 404, {
        message: 'No user found'
      });
      return;
    }

    const responseBody = {user};
    sendJsonResponse(res, 200, responseBody);
  });
};

/* POST create a new league */
module.exports.leagueCreate = function(req, res) {
  getUserData(req, res, function(req, res, user) {
    LeagueModel.create({name: req.body.name})
      .then(league => {

        //find the user object for current user
        UserModel.findOne(
          {
            _id: user._id
          },
          function(err, user) {

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

            //add the new league ID
            user.leagues.push({id: league._id, name: league.name});

            //save
            user.save(function(err, user) {
              if (err) {
                sendJsonResponse(res, 400, err);
              } else {
                sendJsonResponse(res, 200, league);
              }
            });
          }
        )})
      .catch(err => {
        console.log("error in controller");
        sendJsonResponse(res, 400, err);
      })
  })

};

/* POST join a league by ID */
module.exports.leagueJoin = function(req, res) {
  if (!req.params.leagueId) {
    sendJsonResponse(res, 404, {
      message: "Error: leagueId is required"
    });
    return;
  }
  getUserData(req, res, function(req, res, user) {

    //find the user object for current user
    UserModel.findOne(
      {
        _id: user._id
      },
      function(err, user) {

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
        const leagueIndex = _.findIndex(user.leagues, { 'id': req.params.leagueId})
        if (leagueIndex > -1) {
          sendJsonResponse(res, 400, {
            message: "User already belongs to this league."
          });
          return;
        }

        //check that the league actually exists, and get its name:
        const leagueId = req.params.leagueId;

        if (!leagueId.match(/^[0-9a-fA-F]{24}$/)) {
          sendJsonResponse(res, 400, {
            message: "Invalid league ID."
          });
          return;
        }

        LeagueModel.findById(leagueId)
          .exec(function(err, league){
            if(err){
              sendJsonResponse(res, 400, err);
              return;
            }

            if(!league) {
              sendJsonResponse(res, 400, {
                message: "No league found for that ID."
              });
              return;
            }

            //add the new league ID
            user.leagues.push({id: req.params.leagueId, name: league.name});

            //save
            user.save(function(err, user) {
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
