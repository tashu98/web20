const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        req.user = jwt.verify(token, 'your-secret-key');
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed' });
    }
};

module.exports = auth;
