const Notification = require('../models/Notification');

/* =====================
   GET MY NOTIFICATIONS
===================== */
exports.getMyNotifications = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'USER') {
      filter = {
        forRole: 'USER',
        $or: [
          { recipient: req.user._id },   // personal notifications
          { recipient: null }            // general user notifications (orders)
        ]
      };
    } else {
      filter = { forRole: req.user.role };
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =====================
   MARK AS READ
===================== */
exports.markAsRead = async (req, res) => {
  try {
    const n = await Notification.findById(req.params.id);
    if (!n) return res.status(404).json({ error: 'Not found' });

    n.read = true;
    await n.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   🔔 NEW — CREATE USER NOTIFICATION (FOR ADMIN REPLY)
   Used by adminRoutes when replying to contact message
========================================================= */
exports.createUserNotification = async ({
  userId,
  message,
  link = '/contact'
}) => {
  if (!userId) return;

  await Notification.create({
    forRole: 'USER',
    recipient: userId,
    message,
    link
  });
};

exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
