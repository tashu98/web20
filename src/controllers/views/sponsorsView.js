const Sponsor = require('../../models/Sponsor');
const {isAdmin} = require("../../middleware/auth");

exports.renderCreateForm = async (req, res) => {
    try {
        res.render('sponsors/create');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAllSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.find();
        res.render('sponsors/index', {sponsors, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getSponsorById = async (req, res) => {
    try {
        const sponsor = await Sponsor.findById(req.params.id);
        if (!sponsor) {
            return res.status(404).send('Sponsor not found');
        }
        res.render('sponsors/details', {sponsor, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createSponsor = async (req, res) => {
    try {
        const {name, industry} = req.body;
        await Sponsor.create({name, industry});
        res.redirect('/sponsors');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const sponsor = await Sponsor.findById(req.params.id);
        if (!sponsor) {
            return res.status(404).send('Sponsor not found');
        }
        res.render('sponsors/edit', {sponsor});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateSponsor = async (req, res) => {
    try {
        const {name, industry} = req.body;
        await Sponsor.findByIdAndUpdate(req.params.id, {name, industry});
        res.redirect('/sponsors');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteSponsor = async (req, res) => {
    try {
        await Sponsor.findByIdAndDelete(req.params.id);
        res.redirect('/sponsors');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
