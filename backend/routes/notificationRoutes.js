const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const notificationController = require('../controllers/notificationController');

/**
 * ===============================
 * GET MY NOTIFICATIONS
 * ===============================
 * ADMIN  → admin notifications
 * TEAM   → team notifications
 * USER   → user notifications
 */
router.get(
  '/',
  auth,
  permit('ADMIN', 'TEAM', 'USER'),
  notificationController.getMyNotifications
);

/**
 * ===============================
 * MARK NOTIFICATION AS READ
 * ===============================
 */
router.put(
  '/:id/read',
  auth,
  permit('ADMIN', 'TEAM', 'USER'),
  notificationController.markAsRead
);

/**
 * ===============================
 * DELETE NOTIFICATION (OPTIONAL)
 * ===============================
 */
router.delete(
  '/:id',
  auth,
  permit('ADMIN', 'TEAM', 'USER'),
  notificationController.deleteNotification
);

module.exports = router;
