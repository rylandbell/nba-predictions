'use strict';
const mongoose = require('mongoose');

const MessageLogModel = mongoose.model('MessageLog');
const UserModel = mongoose.model('User');

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

/* GET full message log for given league */
module.exports.getMessageLog = function (req, res) {
  MessageLogModel
    .find({ league: 'alpha' })
    .exec(function (err, messageLogs) {
      let responseBody = {};
      if (!messageLogs) {
        sendJsonResponse(res, 404, {
          message: 'no message log found'
        });
        return;
      } else if (err) {
        console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      } else if (messageLogs.length === 0) {
        sendJsonResponse(res, 404, {
          message: 'no message log found'
        });
        return;
      } else {
        responseBody = messageLogs[0];
        sendJsonResponse(res, 200, responseBody);
      }
    });
};

/* PUT: push a new message to the messages array */
module.exports.sendMessage = function (req, res) {
  getOwnerData(req, res, function (req, res, owner) {
    console.log(owner);
    // return null;
    if (req.body && req.body.content) {
      MessageLogModel.find({
        league: 'alpha',
      }, function (err, messageLogs) {
        if (err) {
          console.log('error in controller');
          sendJsonResponse(res, 500, err);
          return;
        } else if (!messageLogs) {
          sendJsonResponse(res, 404, {
            message: 'message log not found'
          });
          return;
        } else if (messageLogs.length === 0) {
          sendJsonResponse(res, 200, messageLogs);
          return;
        } else {
          const newMessage = {
            content: req.body.content,
            sender: owner.displayName,
            timeSent: new Date().toISOString()
          }
          messageLogs[0].messages.push(newMessage);
          messageLogs[0].save(function (err, messageLog) {
            if (err) {
              sendJsonResponse(res, 400, err);
              return;
            } else {
              sendJsonResponse(res, 200, messageLog);
              return;
            }
          });
        }
      });
    } else {
      sendJsonResponse(res, 400, {
        message: 'You should add some text to that message.'
      });
      return;
    }
  });
};

