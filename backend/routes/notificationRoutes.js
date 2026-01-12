const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const notificationController = require('../controllers/notificationController');

/**
 * Get notifications for logged-in user
 * ADMIN → admin notifications
 * TEAM / USER → their own notifications (future-ready)
 */
router.get(
  '/',
  auth,
  permit('ADMIN', 'TEAM', 'USER'),
  notificationController.getMyNotifications
);

/**
 * Mark notification as read
 */
router.put(
  '/:id/read',
  auth,
  permit('ADMIN', 'TEAM', 'USER'),
  notificationController.markAsRead
);

module.exports = router;
