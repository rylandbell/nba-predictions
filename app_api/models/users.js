'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//stores reference to a league object, but is not itself the league object (see ./leagues for league schema)
const leagueRefSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  joinPhrase: {type: String, required: true}
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String
  },
  role: {
    type: String,
    default: 'admin',
    required: true
  },
  hash: String,
  salt: String,
  leagues: [leagueRefSchema]
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 300);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    name: this.name,
    leagueIds: this.leagueIds,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

//connect this schema to the database. automatically creates
//a MongoDB collection 'users' based on the supplied param 'User'

mongoose.model('User', userSchema);
