const express = require('express');
const router = express.Router();
const driverController = require('../controllers/views/driverView');
const {verifyAdmin} = require("../middleware/auth");

router.get('/', driverController.getAllDrivers);
router.get('/new', verifyAdmin, driverController.renderCreateForm);
router.post('/new', verifyAdmin, driverController.createDriver);
router.get('/details/:id', driverController.getDriverById);
router.get('/details/:id/edit', verifyAdmin, driverController.renderEditForm);
router.post('/details/:id/edit', verifyAdmin, driverController.updateDriver);
router.post('/details/:id/delete', verifyAdmin, driverController.deleteDriver);

module.exports = router;
