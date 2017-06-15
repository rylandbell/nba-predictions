'use strict';
const mongoose = require('mongoose');

const UserModel = mongoose.model('User');
const LeagueModel = mongoose.model('League');

//helper function for composing responses as status codes (e.g. 404) with JSON files
const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting author data from JWT
const getOwnerData = function (req, res, callback) {
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

/* POST create a new league */
module.exports.leagueCreate = function (req, res) {
  LeagueModel.create({
    name: req.body.name
  }, function (err, league) {
    if (err) {
      console.log('error in controller');
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, league);
    }
  });
};

/* POST join a league by ID */
// module.exports.leagueJoin = function (req, res) {
//   LeagueModel.create({
//     name: req.body.name
//   }, function (err, league) {
//     if (err) {
//       console.log('error in controller');
//       sendJsonResponse(res, 400, err);
//     } else {
//       sendJsonResponse(res, 201, league);
//     }
//   });
// };