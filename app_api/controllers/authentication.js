var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  if (!req.body.username || !req.body.displayName ||!req.body.password) {
    sendJsonResponse(res, 400, {
      message: 'All fields required'
    });
    return;
  }

  var user = new User();
  user.displayName = req.body.displayName;
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function (err, user) {
    var token;
    if (err) {
      if (err.code === 11000) {
        sendJsonResponse(res, 400, {
          message: 'That username is already taken. Try something else.'
        });
      } else {
        sendJsonResponse(res, 404, err);
      }
    } else {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        token: token
      });
    }
  });
};

module.exports.login = function (req, res) {
  if (!req.body.username || !req.body.password) {
    sendJsonResponse(res, 400, {
      message: 'All fields required'
    });
    return;
  }

  passport.authenticate('local', function (err, user, info) {
    var token;

    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        token: token
      });
    } else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);

};
