var mongoose = require('mongoose');

var MessageLogModel = mongoose.model('MessageLog');


//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET full message log for given league */
module.exports.getMessageLog = function (req, res) {
  MessageLogModel
    .find({ league: 'alpha' })
    .exec(function (err, messageLogs) {
      var responseBody = {};
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
  if (req.body && req.body.content && req.body.sender) {
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
          sender: req.body.sender,
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
      message: 'new messages need a sender and content'
    });
    return;
  }
};

