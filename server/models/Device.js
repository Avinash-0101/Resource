const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  user: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
});

module.exports = mongoose.model('Device', deviceSchema);
