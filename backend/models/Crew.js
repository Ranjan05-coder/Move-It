const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  // Team member relationship
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Crew member details
  name: {
    type: String,
    required: true
  },

  phone: String,

  email: {
    type: String,
    lowercase: true
  },

  // Crew role (flexible for future: driver, helper, supervisor)
  role: {
    type: String,
    default: 'Helper'
  },

  // Active status
  isActive: {
    type: Boolean,
    default: true
  },

  // Tracking
  assignedOrders: {
    type: Number,
    default: 0
  },

  completedOrders: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model('Crew', crewSchema);
