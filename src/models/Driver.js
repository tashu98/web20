const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
