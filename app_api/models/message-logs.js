const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  timeSent: { type: String, default: new Date().toISOString() },
  content: { type: String, required: true },
  sender: { type: String, required: true }
});

const messageLogSchema = new mongoose.Schema({
  leagueId: { type: String, required: true },
  messages: [messageSchema]
});

//connect this schema to the database. automatically creates a MongoDB collection 'messagelogs' based on the supplied parameter 'MessageLog'
mongoose.model("MessageLog", messageLogSchema);
