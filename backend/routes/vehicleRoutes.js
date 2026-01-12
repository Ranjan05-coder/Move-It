const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.get('/', vehicleController.listVehicles);
router.post('/', auth, permit('admin'), vehicleController.createVehicle);
router.put('/:id', auth, permit('admin'), vehicleController.updateVehicle);

module.exports = router;
