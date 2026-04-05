const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  forRole: {
    type: String,
    enum: ['USER', 'ADMIN', 'TEAM'],
    required: true
  },
  type: String,
  message: String,
  link: String,          // 🔗 where to go on click
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
