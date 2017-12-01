const mongoose = require("mongoose");

const MessageLogModel = mongoose.model("MessageLog");
const { sendJsonResponse, getUserData, APIException } = require("./helpers");

/* GET full message log for given league */
module.exports.getMessageLog = async function(req, res) {
  if (!req.params.leagueId) {
    throw new APIException(res, 400, "No league ID submitted with request.");
  }

  const messageLog = await MessageLogModel.findOne({
    leagueId: req.params.leagueId
  });

  if (!messageLog) {
    throw new APIException(res, 404, "No message log found for this league.");
  }

  sendJsonResponse(res, 200, messageLog);
};

/* PUT: push a new message to the messages array */
module.exports.sendMessage = function(req, res) {
  getUserData(req, res, (req, res, user) => {
    if (req.body && req.body.content) {
      MessageLogModel.find(
        {
          leagueId: req.params.leagueId
        },
        (err, messageLogs) => {
          if (err) {
            console.log("error in controller");
            sendJsonResponse(res, 500, err);
            return;
          } else if (!messageLogs) {
            sendJsonResponse(res, 404, {
              message: "message log not found"
            });
            return;
          } else if (messageLogs.length === 0) {
            sendJsonResponse(res, 200, messageLogs);
            return;
          } else {
            const newMessage = {
              content: req.body.content,
              sender: user.displayName,
              timeSent: new Date().toISOString()
            };
            messageLogs[0].messages.push(newMessage);
            messageLogs[0].save((err, messageLog) => {
              if (err) {
                sendJsonResponse(res, 400, err);
                return;
              } else {
                sendJsonResponse(res, 200, messageLog);
                return;
              }
            });
          }
        }
      );
    } else {
      sendJsonResponse(res, 400, {
        message: "You should add some text to that message."
      });
      return;
    }
  });
};
