const jwt = require("jsonwebtoken");
const User = require('../models/User');

exports.verifyLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;

        if (!token) {
            return res.redirect('/login?error=Unauthorized',)
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.redirect('/login?error=Unauthorized',)
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.redirect('/login?error=Unauthorized',)
    }
};

exports.verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res.redirect('/login?error=Unauthorized',)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.redirect('/login?error=Unauthorized',)
        }

        if (decoded.role === 'admin') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).render('error', {message: 'Forbidden', error: {status: 403}});
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/login?error=Unauthorized',)
    }

};

exports.isLoggedIn = async (req) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            return false;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

exports.isAdmin = async (req) => {
    try {

        const token = req.cookies.jwtToken;
        if (!token) {
            return false;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return false;
        }

        if (decoded.role === 'admin') {
            return true;
        } else {
            return false;
        }
    } catch
        (error) {
        console.error(error);
        return false;
    }
}
