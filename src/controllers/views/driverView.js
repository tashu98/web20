const Driver = require('../../models/Driver');
const Team = require('../../models/Team');
const mongoose = require('mongoose');
const {isAdmin} = require('../../middleware/auth');

exports.renderCreateForm = async (req, res) => {
    try {
        const teams = await Team.find();
        res.render('drivers/create', {teams});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate('team');
        res.render('drivers/index', {drivers, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id).populate('team');
        res.render('drivers/details', {driver, isAdmin: await isAdmin(req)});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createDriver = async (req, res) => {
    try {
        // Extract driver information from the request body
        const {name, age, nationality, team} = req.body;

        let driver;

        // Check if the team is provided
        if (team) {
            // Find the team by its ID
            const foundTeam = await Team.findById(team);

            // Create the driver with the provided team
            driver = await Driver.create({
                name,
                age,
                nationality,
                team: foundTeam._id  // Assign the team's ObjectId to the driver's team field
            });

            // Push the driver's ObjectId to the team's drivers array
            foundTeam.drivers.push(driver._id);
            await foundTeam.save();
        } else {
            // If no team is provided, create the driver without associating it with a team
            driver = await Driver.create({
                name,
                age,
                nationality
            });
        }

        // Redirect the user to the list of drivers after successful creation
        res.redirect('/drivers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.renderEditForm = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        const teams = await Team.find();
        res.render('drivers/edit', {driver, teams});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
exports.updateDriver = async (req, res) => {
    try {
        const { name, age, nationality, team } = req.body;

        // Find the driver by ID
        const driver = await Driver.findById(req.params.id);

        // Check if the driver exists
        if (!driver) {
            return res.status(404).send('Driver not found');
        }

        // Check if the driver has a team before converting it to a string
        const oldTeamId = driver.team ? driver.team.toString() : null;

        // Check if the team exists
        const existingTeam = await Team.findById(team);
        if (!existingTeam) {
            return res.status(400).send('Team not found');
        }

        // Check if the team ID has changed
        if (team !== oldTeamId) {
            // If the team ID has changed, remove the driver from the old team's drivers array
            if (oldTeamId) {
                const oldTeam = await Team.findById(oldTeamId);
                oldTeam.drivers = oldTeam.drivers.filter(driverId => driverId.toString() !== req.params.id);
                await oldTeam.save();
            }

            // Update the driver with the new team
            driver.name = name;
            driver.age = age;
            driver.nationality = nationality;
            driver.team = team;
            await driver.save();

            // Add the driver to the new team's drivers array
            existingTeam.drivers.push(driver._id);
            await existingTeam.save();
        } else {
            // If the team ID hasn't changed, simply update the driver's information
            await driver.updateOne({ name, age, nationality });
        }

        res.redirect('/drivers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.redirect('/drivers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
