const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res) => {
    const {error} = req.query;
    if (error === 'Unauthorized') {
        return res.render('login', {error: 'Unauthorized, please log in'});
    }
    res.render('login', {error});
};

exports.postLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.render('login', {error: 'Invalid credentials, user not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {error: 'Invalid credentials, invalid password'});
        }

        const token = generateToken(user);

        res.cookie('jwtToken', token, {httpOnly: true});
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).render('error', {message: 'Server Error', error: {status: 500, stack: error.stack}});
    }
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;
        const newUser = await User.create({username, email, password, role});
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {message: 'Server Error', error: {status: 500, stack: err.stack}});
    }
};

exports.changePassword = async (req, res) => {
    const {currentPassword, newPassword, confirmPassword} = req.body;

    const token = req.cookies.jwtToken;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const user = await User.findById(userId);

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.render('error', {message: 'Invalid old password', error: {status: 401}});
        }

        if (newPassword !== confirmPassword) {
            return res.render('error', {
                message: 'New password and confirm password do not match',
                error: {status: 400}
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, {password: hashedPassword});

        res.redirect('/'); // Redirect to some success page or the dashboard
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {message: 'Server Error', error: {status: 500, stack: error.stack}});
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwtToken');
    res.redirect('/');
}

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, username: user.username, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1h'} // Token expires in 1 hour, adjust as needed
    );
};
