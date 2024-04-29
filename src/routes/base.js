const express = require('express');
const router = express.Router();
const authController = require('../controllers/views/authController');
const { isLoggedIn, isAdmin, verifyAdmin, verifyLoggedIn } = require('../middleware/auth');

router.get('/', async (req, res) => {
    if (await isLoggedIn(req)) {
        res.render('dashboard', {isAuthenticated: true});
    } else {
        res.render('index', {isAuthenticated: false});
    }
});

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.post('/changepassword', authController.changePassword);

router.post('/logout', authController.logout);

module.exports = router;
