const Order = require('../models/Order');
const Vehicle = require('../models/Vehicle');
const Crew = require('../models/Crew');

exports.listAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('package customer vehicle crew')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignVehicleAndCrew = async (req, res) => {
  try {
    const { vehicleId, crewId } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const vehicle = vehicleId ? await Vehicle.findById(vehicleId) : null;
    const crew = crewId ? await Crew.findById(crewId) : null;

    if (vehicle && !vehicle.isAvailable) return res.status(400).json({ error: 'Vehicle not available' });
    if (crew && !crew.isAvailable) return res.status(400).json({ error: 'Crew not available' });

    if (vehicle) {
      vehicle.isAvailable = false;
      await vehicle.save();
      order.vehicle = vehicle._id;
    }
    if (crew) {
      crew.isAvailable = false;
      await crew.save();
      order.crew = crew._id;
    }

    order.status = 'assigned';
    order.tracking.push({ status: 'assigned', note: 'Vehicle and crew assigned', timestamp: new Date() });
    await order.save();

    const populated = await Order.findById(order._id).populate('vehicle crew package customer');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;
    order.tracking.push({ status, note: note || '', timestamp: new Date() });

    // if completed, free vehicle & crew
    if (status === 'completed') {
      if (order.vehicle) {
        const v = await Vehicle.findById(order.vehicle);
        if (v) { v.isAvailable = true; await v.save(); }
      }
      if (order.crew) {
        const c = await Crew.findById(order.crew);
        if (c) { c.isAvailable = true; await c.save(); }
      }
    }

    await order.save();
    const populated = await Order.findById(order._id).populate('vehicle crew package customer');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
