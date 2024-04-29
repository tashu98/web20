const Race = require('../../models/Race');
const Team = require('../../models/Team');
const {isAdmin} = require("../../middleware/auth");

exports.renderCreateForm = async (req, res) => {
    try {
        const teams = await Team.find();
        res.render('races/create', {teams});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAllRaces = async (req, res) => {
    try {
        const races = await Race.find().populate('teams');
        res.render('races/index', {races, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getRaceById = async (req, res) => {
    try {
        const race = await Race.findById(req.params.id).populate('teams');
        if (!race) {
            return res.status(404).send('Race not found');
        }
        res.render('races/details', {race, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createRace = async (req, res) => {
    try {
        const {name, date, location, distance, teams} = req.body;

        if (!teams || teams.length === 0) {
            return res.status(400).send('At least one team must be selected');
        }
        await Race.create({name, date, location, distance, teams});
        res.redirect('/races');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.renderEditForm = async (req, res) => {
    try {
        const race = await Race.findById(req.params.id);
        const teams = await Team.find();
        res.render('races/edit', {race, teams});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateRace = async (req, res) => {
    try {
        const {name, date, location, distance, teams} = req.body;

        if (!teams || teams.length === 0) {
            return res.status(400).send('At least one team must be selected');
        }

        await Race.findByIdAndUpdate(req.params.id, {name, date, location, distance, teams});
        res.redirect('/races');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.deleteRace = async (req, res) => {
    try {
        await Race.findByIdAndDelete(req.params.id);
        res.redirect('/races');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
