const Team = require('../../models/Team');
const {isAdmin} = require("../../middleware/auth");

exports.renderCreateForm = async (req, res) => {
    try {
        res.render('teams/create');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.render('teams/index', {teams, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('drivers').populate('sponsors');
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.render('teams/details', {team, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createTeam = async (req, res) => {
    try {
        const {name, country} = req.body;
        await Team.create({name, country});
        res.redirect('/teams');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.render('teams/edit', {team});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const {name, country} = req.body;
        await Team.findByIdAndUpdate(req.params.id, {name, country});
        res.redirect('/teams');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.redirect('/teams');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
