var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  timeSent: { type: String, default: new Date().toISOString() },
  content: { type: String, required: true },
  sender: { type: String, required: true }
});

var messageLogSchema = new mongoose.Schema({
  league: {type: String, default: "alpha", unique: true},
  messages: [messageSchema]
});

//connect this schema to the database. automatically creates a MongoDB collection 'months' based on the supplied parameter 'Month'
mongoose.model('MessageLog', messageLogSchema);
