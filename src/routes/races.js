const express = require('express');
const router = express.Router();
const raceController = require('../controllers/views/racesView');
const {verifyAdmin} = require("../middleware/auth");

router.get('/', raceController.getAllRaces);
router.get('/:id', raceController.getRaceById);
router.get('/new', verifyAdmin, raceController.renderCreateForm);
router.post('/', verifyAdmin, raceController.createRace);
router.get('/:id/edit', verifyAdmin, raceController.renderEditForm);
router.post('/:id/edit', verifyAdmin, raceController.updateRace);
router.post('/:id/delete', verifyAdmin, raceController.deleteRace);

module.exports = router;
