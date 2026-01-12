const Notification = require('../models/Notification');

async function notify({ recipient, order, type, message }) {
  return Notification.create({
    recipient,
    order,
    type,
    message
  });
}

module.exports = notify;
