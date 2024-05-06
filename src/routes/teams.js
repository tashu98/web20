const express = require('express');
const router = express.Router();
const teamController = require('../controllers/views/teamView');
const {verifyAdmin} = require("../middleware/auth");

router.get('/', teamController.getAllTeams);
router.get('/details/:id', teamController.getTeamById);
router.get('/new', verifyAdmin, teamController.renderCreateForm);
router.post('/new', verifyAdmin, teamController.createTeam);
router.get('/details/:id/edit', verifyAdmin, teamController.renderEditForm);
router.post('/details/:id/edit', verifyAdmin, teamController.updateTeam);
router.post('/details/:id/delete', verifyAdmin, teamController.deleteTeam);

module.exports = router;
