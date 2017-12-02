const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const { sendJsonResponse, APIException } = require("./helpers");

module.exports.register = async function(req, res) {
  if (!req.body.username || !req.body.displayName || !req.body.password) {
    throw new APIException(res, 400, "All fields required");
  }

  // create a user object
  const user = new User();
  user.displayName = req.body.displayName;
  user.username = req.body.username;
  user.setPassword(req.body.password);

  // save the new user
  try {
    const savedUser = await user.save();

    // respond with an auth JWT
    const token = savedUser.generateJwt();
    sendJsonResponse(res, 200, {
      token: token
    });
  } catch (err) {
    // handle uniqueness violation errors here:
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
      // throw other errors to generic error handler:
      throw new APIException(res, 400, "user was not saved");
    }
  }
};

module.exports.login = async function(req, res) {
  if (!req.body.username || !req.body.password) {
    throw new APIException(res, 400, "All fields required");
  }

  passport.authenticate("local", (err, user, info) => {
    let token;

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
