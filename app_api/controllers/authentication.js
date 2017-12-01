const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const { sendJsonResponse } = require("./helpers");

module.exports.register = function(req, res) {
  if (!req.body.username || !req.body.displayName || !req.body.password) {
    sendJsonResponse(res, 400, {
      message: "All fields required"
    });
    return;
  }

  const user = new User();
  user.displayName = req.body.displayName;
  user.username = req.body.username;
  user.setPassword(req.body.password);
  if (req.body.email) {
    user.email = req.body.email;
  }

  user.save((err, user) => {
    let token;
    if (err) {
      // uniqueness violation errors:
      if (err.code === 11000) {
        let duplicateFieldName = err.message.split(" ")[7];

        if (duplicateFieldName === "displayName_1") {
          duplicateFieldName = "display name";
        } else if ((duplicateFieldName = "username_1")) {
          duplicateFieldName = "username";
        }

        sendJsonResponse(res, 400, {
          message: `That ${duplicateFieldName} is already taken. Try something else.`
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

module.exports.login = function(req, res) {
  if (!req.body.username || !req.body.password) {
    sendJsonResponse(res, 400, {
      message: "All fields required"
    });
    return;
  }

  passport.authenticate("local", (err, user, info) => {
    let token;

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
