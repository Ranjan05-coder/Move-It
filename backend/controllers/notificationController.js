const Notification = require('../models/Notification');

/* ================= GET MY NOTIFICATIONS ================= */
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      forRole: req.user.role,
      $or: [
        { recipient: null },           // role-wide notifications
        { recipient: req.user._id }    // user-specific notifications
      ],
      read: false
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= MARK AS READ ================= */
const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      read: true
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMyNotifications,
  markAsRead
};
