"use strict";
const mongoose = require("mongoose");

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

/* POST create a new league */
module.exports.leagueCreate = function(req, res) {
  LeagueModel.create(
    {
      name: req.body.name,
      public: req.body.public
    },
    function(err, league) {
      if (err) {
        console.log("error in controller");
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, league);
      }
    }
  );
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
        if (user.leagueIds.indexOf(req.params.leagueId) > -1) {
          sendJsonResponse(res, 400, {
            message: "user already belongs to this league"
          });
          return;
        }

        //add the new league ID
        user.leagueIds.push(req.params.leagueId);

        //save
        user.save(function(err, userMonth) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            sendJsonResponse(res, 200, userMonth);
          }
        });
      }
    );
  });
};
