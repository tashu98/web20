const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/views/sponsorsView');
const { verifyAdmin } = require("../middleware/auth");

router.get('/', sponsorController.getAllSponsors);
router.get('/:id', sponsorController.getSponsorById);
router.get('/new', verifyAdmin, sponsorController.renderCreateForm);
router.post('/', verifyAdmin, sponsorController.createSponsor);
router.get('/:id/edit', verifyAdmin, sponsorController.renderEditForm);
router.post('/:id/edit', verifyAdmin, sponsorController.updateSponsor);
router.post('/:id/delete', verifyAdmin, sponsorController.deleteSponsor);

module.exports = router;
