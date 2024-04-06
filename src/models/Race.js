const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
});

const Race = mongoose.model('Race', raceSchema);

module.exports = Race;
