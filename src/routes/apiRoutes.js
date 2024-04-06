
const express = require('express');
const router = express.Router();
const authController = require('../controllers/api/authController');
const driverController = require('../controllers/api/driverController');


router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/drivers', driverController.getAllDrivers);
router.get('/drivers/:id', driverController.getDriverById);
router.post('/drivers', driverController.createDriver);
router.put('/drivers/:id', driverController.updateDriver);
router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;
