
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',{title: "TYtule"});
});
module.exports = router;
