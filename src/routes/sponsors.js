const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/views/sponsorsView');
const { verifyAdmin } = require("../middleware/auth");

router.get('/', sponsorController.getAllSponsors);
router.get('/details/:id', sponsorController.getSponsorById);
router.get('/new', verifyAdmin, sponsorController.renderCreateForm);
router.post('/new', verifyAdmin, sponsorController.createSponsor);
router.get('/details/:id/edit', verifyAdmin, sponsorController.renderEditForm);
router.post('/details/:id/edit', verifyAdmin, sponsorController.updateSponsor);
router.post('/details/:id/delete', verifyAdmin, sponsorController.deleteSponsor);

module.exports = router;
