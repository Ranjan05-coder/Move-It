const Order = require('../models/Order');
const Package = require('../models/Package');
const Notification = require('../models/Notification');

/* ===================== STATUS CONSTANTS ===================== */
const STATUS = {
  PLACED: 'PLACED',
  PAID: 'PAID',
  ASSIGNED: 'ASSIGNED',
  DEPARTED: 'DEPARTED',
  ARRIVED: 'ARRIVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

/* ===================== PRICE CALCULATOR ===================== */
const calcPrice = (pkg, addons = []) => {
  const basePrice = pkg.price || 0;
  const addonsPrice = addons.reduce((s, a) => s + (a.price || 0), 0);
  return { basePrice, addonsPrice, total: basePrice + addonsPrice };
};

/* ===================== SAFE NOTIFICATION CREATOR ===================== */
const createNotificationOnce = async ({
  forRole,
  recipient = null,
  order,
  type,
  message
}) => {
  const exists = await Notification.findOne({
    forRole,
    recipient,
    order,
    type,
    read: false
  });

  if (!exists) {
    await Notification.create({
      forRole,
      recipient,
      order,
      type,
      message
    });
  }
};

/* ===================== USER — CREATE ORDER ===================== */
exports.createOrder = async (req, res) => {
  try {
    const { packageId, pickupAddress, dropAddress, scheduledAt } = req.body;

    if (!packageId || !pickupAddress || !dropAddress || !scheduledAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    const order = await Order.create({
      customer: req.user._id,
      package: pkg._id,
      pickupAddress,
      dropAddress,
      scheduledAt,
      priceBreakdown: calcPrice(pkg),
      payment: { method: 'mock', paid: false },
      status: STATUS.PLACED,
      tracking: [{ status: STATUS.PLACED, note: 'Order placed by user' }]
    });

    await createNotificationOnce({
      forRole: 'ADMIN',
      order: order._id,
      type: 'ORDER_PLACED',
      message: `New order placed: ${order._id}`
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===================== USER — MARK PAID ===================== */
exports.markPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.payment.paid = true;
  order.payment.paymentId = `mock_${Date.now()}`;
  order.payment.paidAt = new Date();
  order.status = STATUS.PAID;

  order.tracking.push({ status: STATUS.PAID, note: 'Payment completed' });
  await order.save();

  await createNotificationOnce({
    forRole: 'ADMIN',
    order: order._id,
    type: 'ORDER_PAID',
    message: `Payment completed for order ${order._id}`
  });

  res.json(order);
};

/* ===================== USER — MY ORDERS ===================== */
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id })
    .populate('package assignedTeam')
    .sort({ createdAt: -1 });

  res.json(orders);
};

/* ===================== GET ORDER BY ID ===================== */
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('package customer assignedTeam');

  if (!order) return res.status(404).json({ error: 'Order not found' });

  if (
    req.user.role === 'USER' &&
    String(order.customer._id) !== String(req.user._id)
  ) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json(order);
};

/* ===================== ADMIN — ASSIGN TEAM ===================== */
exports.assignOrder = async (req, res) => {
  const { teamId } = req.body;
  if (!teamId) return res.status(400).json({ error: 'teamId required' });

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.assignedTeam = teamId;
  order.status = STATUS.ASSIGNED;
  order.tracking.push({ status: STATUS.ASSIGNED, note: 'Team assigned' });
  await order.save();

  await createNotificationOnce({
    forRole: 'TEAM',
    recipient: teamId,
    order: order._id,
    type: 'TEAM_ASSIGNED',
    message: `You have been assigned order ${order._id}`
  });

  res.json(order);
};

/* ===================== TEAM — REQUEST DEPART ===================== */
exports.teamDepartNotify = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.status !== STATUS.ASSIGNED) {
    return res.status(400).json({ error: 'Order not ready to depart' });
  }

  order.status = STATUS.DEPARTED;
  order.tracking.push({ status: STATUS.DEPARTED, note: 'Team departed' });
  await order.save();

  await createNotificationOnce({
    forRole: 'ADMIN',
    order: order._id,
    type: 'TEAM_DEPARTED',
    message: `Team departed for order ${order._id}`
  });

  res.json({ success: true });
};

/* ===================== ADMIN — CONFIRM DEPART ===================== */
exports.confirmDepart = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.status !== STATUS.DEPARTED) {
    return res.status(400).json({ error: 'Invalid state' });
  }

  await createNotificationOnce({
    forRole: 'USER',
    order: order._id,
    type: 'ORDER_DEPARTED',
    message: `Your order ${order._id} has departed`
  });

  res.json(order);
};

/* ===================== TEAM — REQUEST ARRIVE ===================== */
exports.teamArriveNotify = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.status !== STATUS.DEPARTED) {
    return res.status(400).json({ error: 'Order not departed yet' });
  }

  order.status = STATUS.ARRIVED;
  order.tracking.push({ status: STATUS.ARRIVED, note: 'Team arrived' });
  await order.save();

  await createNotificationOnce({
    forRole: 'ADMIN',
    order: order._id,
    type: 'TEAM_ARRIVED',
    message: `Team requested arrival confirmation`
  });

  res.json({ success: true });
};

/* ===================== ADMIN — CONFIRM ARRIVE ===================== */
exports.confirmArrive = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.status !== STATUS.ARRIVED) {
    return res.status(400).json({ error: 'Invalid state' });
  }

  await createNotificationOnce({
    forRole: 'USER',
    order: order._id,
    type: 'ORDER_ARRIVED',
    message: `Your order has arrived`
  });

  res.json(order);
};

/* ===================== USER — SUBMIT FEEDBACK ===================== */
/* ================= USER — SUBMIT FEEDBACK ================= */
exports.submitFeedback = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.status !== 'ARRIVED') {
      return res.status(400).json({ error: 'Order not ready for feedback' });
    }

    // ✅ Normalize feedback structure
    order.feedback = {
      comment: req.body.comment,
      submittedAt: new Date()
    };

    await order.save();

    await Notification.create({
      forRole: 'ADMIN',
      order: order._id,
      message: `Feedback submitted for order ${order._id}`
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===================== ADMIN — CONFIRM COMPLETION ===================== */
exports.confirmCompletion = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || !order.feedback) {
    return res.status(400).json({ error: 'Feedback required' });
  }

  order.status = STATUS.COMPLETED;
  order.tracking.push({ status: STATUS.COMPLETED, note: 'Order completed' });
  await order.save();

  await createNotificationOnce({
    forRole: 'USER',
    order: order._id,
    type: 'ORDER_COMPLETED',
    message: `Your order has been completed`
  });

  res.json(order);
};

/* ===================== ADMIN — ALL ORDERS ===================== */
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('package customer assignedTeam')
    .sort({ createdAt: -1 });

  res.json(orders);
};

/* ===================== TEAM — MY ASSIGNED ORDERS ===================== */
exports.getTeamOrders = async (req, res) => {
  try {
    const orders = await Order.find({ assignedTeam: req.user._id })
      .populate('customer package')
      .select(
        '_id customer package pickupAddress dropAddress scheduledAt status tracking'
      )
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};