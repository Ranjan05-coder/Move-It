const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const orderController = require('../controllers/orderController');

/* =========================
   ADMIN ROUTES (TOP)
========================= */

// ✅ ADMIN – GET ALL ORDERS
router.get('/', auth, permit('ADMIN'), orderController.getAllOrders);

// Assign team
router.put('/:id/assign', auth, permit('ADMIN'), orderController.assignOrder);

// Confirm depart
router.put('/:id/confirm-depart', auth, permit('ADMIN'), orderController.confirmDepart);

// Confirm arrive
router.put('/:id/confirm-arrive', auth, permit('ADMIN'), orderController.confirmArrive);

// Confirm completion
router.put('/:id/confirm-complete', auth, permit('ADMIN'), orderController.confirmCompletion);


/* =========================
   TEAM ROUTES
========================= */

// Get orders assigned to team
router.get('/team', auth, permit('TEAM'), orderController.getTeamOrders);

// Notify depart
router.post('/:id/depart', auth, permit('TEAM'), orderController.teamDepartNotify);

// Notify arrive
router.post('/:id/arrive', auth, permit('TEAM'), orderController.teamArriveNotify);


/* =========================
   USER ROUTES
========================= */

// Create order
router.post('/', auth, permit('USER'), orderController.createOrder);

// Get logged-in user's orders
router.get('/my', auth, permit('USER'), orderController.getMyOrders);

// Mark order as paid
router.put('/:id/pay', auth, permit('USER'), orderController.markPaid);

// Submit feedback
router.post('/:id/feedback', auth, permit('USER'), orderController.submitFeedback);


/* =========================
   COMMON (LAST)
========================= */

// Get single order
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;
