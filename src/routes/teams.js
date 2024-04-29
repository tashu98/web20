const express = require('express');
const router = express.Router();
const teamController = require('../controllers/views/teamView');
const {verifyAdmin} = require("../middleware/auth");

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.get('/new', verifyAdmin, teamController.renderCreateForm);
router.post('/', verifyAdmin, teamController.createTeam);
router.get('/:id/edit', verifyAdmin, teamController.renderEditForm);
router.post('/:id/edit', verifyAdmin, teamController.updateTeam);
router.post('/:id/delete', verifyAdmin, teamController.deleteTeam);

module.exports = router;
