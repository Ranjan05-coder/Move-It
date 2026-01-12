const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  name: String,
  phone: String,
  membersCount: Number,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Crew', crewSchema);
