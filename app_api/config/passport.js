var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'username'
  },
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, {
          message: 'Unknown username. New users can sign up via the blue "Sign Me Up" button below.'
        });
      }

      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password. Please try again.'
        });
      }

      return done(null, user);
    });
  }
));
