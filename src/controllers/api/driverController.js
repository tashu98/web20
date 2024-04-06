// routes/api/controllers/driverController.js
const Driver = require('../../models/Driver');

// Get all drivers
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get driver by ID
const getDriverById = async (req, res) => {
    try {
        const {id} = req.params;
        const driver = await Driver.findById(id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new driver
const createDriver = async (req, res) => {
    try {
        const { name, age, nationality } = req.body;
        const driver = new Driver({ name, age, nationality });
        await driver.save();
        res.status(201).json({ message: 'Driver created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a driver
const updateDriver = async (req, res) => {
    try {
        const { name, age, nationality } = req.body;
        const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, { name, age, nationality }, { new: true });
        res.json(updatedDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a driver
const deleteDriver = async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};
