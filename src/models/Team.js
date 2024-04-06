const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    drivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }],
    sponsors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor'
    }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
