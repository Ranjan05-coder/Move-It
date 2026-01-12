const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

// public list
router.get('/', packageController.listPackages);

// admin operations
router.post('/', auth, permit('admin'), packageController.createPackage);
router.put('/:id', auth, permit('admin'), packageController.updatePackage);
router.delete('/:id', auth, permit('admin'), packageController.deletePackage);

module.exports = router;
