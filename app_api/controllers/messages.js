const mongoose = require("mongoose");

const MessageLogModel = mongoose.model("MessageLog");
const { sendJsonResponse, getUserDataNew, APIException } = require("./helpers");

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
module.exports.sendMessage = async function(req, res) {
  if (!req.body || !req.body.content) {
    throw new APIException(res, 400, "Blank message rejected.");
  }

  //get the relevant user and messageLog objects from DB:
  const user = await getUserDataNew(req, res);
  const messageLog = await MessageLogModel.findOne({
    leagueId: req.params.leagueId
  });

  if (!messageLog) {
    throw new APIException(res, 404, "message log not found");
  }

  //update the retrieved messageLog with new message from req
  const newMessage = {
    content: req.body.content,
    sender: user.displayName,
    timeSent: new Date().toISOString()
  };
  messageLog.messages.push(newMessage);

  //save the messageLog
  const savedLog = await messageLog.save();
  sendJsonResponse(res, 200, messageLog);
};
