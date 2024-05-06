const express = require('express');
const router = express.Router();
const raceController = require('../controllers/views/racesView');
const {verifyAdmin} = require("../middleware/auth");

router.get('/', raceController.getAllRaces);
router.get('/details/:id', raceController.getRaceById);
router.get('/new', verifyAdmin, raceController.renderCreateForm);
router.post('/new', verifyAdmin, raceController.createRace);
router.get('/details/:id/edit', verifyAdmin, raceController.renderEditForm);
router.post('/details/:id/edit', verifyAdmin, raceController.updateRace);
router.post('/details/:id/delete', verifyAdmin, raceController.deleteRace);

module.exports = router;
