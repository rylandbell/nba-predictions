'use strict';
const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

//connect this schema to the database. automatically creates a MongoDB collection 'leagues' based on the supplied parameter 'league'
mongoose.model('League', leagueSchema);
