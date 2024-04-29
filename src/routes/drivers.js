const express = require('express');
const router = express.Router();
const driverController = require('../controllers/views/driverView');
const {verifyAdmin} = require("../middleware/auth");

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.get('/new', verifyAdmin, driverController.renderCreateForm);
router.post('/', verifyAdmin, driverController.createDriver);
router.get('/:id/edit', verifyAdmin, driverController.renderEditForm);
router.post('/:id/edit', verifyAdmin, driverController.updateDriver);
router.post('/:id/delete', verifyAdmin, driverController.deleteDriver);

module.exports = router;
