const dotenv = require('dotenv').config();
const User = require('../models/User');
const Driver = require('../models/Driver');
const Team = require('../models/Team');
const Sponsor = require('../models/Sponsor');
const Race = require('../models/Race');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async (value) => {
        console.log('Mongodb connected....', value.connection.readyState);
        await seedData();
    })
    .catch(err => console.log(err.message));

const usersData = [
    { username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { username: 'user1', email: 'user1@example.com', password: 'password1', role: 'user' },
    { username: 'user2', email: 'user2@example.com', password: 'password2', role: 'user' },
];

const hashedUsersData = Promise.all(usersData.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return {
        ...user,
        password: hashedPassword
    };
}));

const driversData = [
    { name: 'Lewis Hamilton', age: 37, nationality: 'British' },
    { name: 'Max Verstappen', age: 24, nationality: 'Dutch' },
    { name: 'Charles Leclerc', age: 24, nationality: 'Monegasque' },
];

const teamsData = [
    { name: 'Mercedes-AMG Petronas Formula One Team', country: 'Germany' },
    { name: 'Red Bull Racing Honda', country: 'Austria' },
    { name: 'Scuderia Ferrari', country: 'Italy' },
];

const sponsorsData = [
    { name: 'Petronas', industry: 'Oil & Gas' },
    { name: 'Red Bull', industry: 'Energy Drink' },
    { name: 'Shell', industry: 'Oil & Gas' },
];

const racesData = [
    { name: 'Monaco Grand Prix', date: new Date('2024-05-26'), location: 'Monte Carlo', distance: 260.52 },
    { name: 'British Grand Prix', date: new Date('2024-07-14'), location: 'Silverstone', distance: 306.198 },
    { name: 'Italian Grand Prix', date: new Date('2024-09-08'), location: 'Monza', distance: 306.72 },
];

async function seedData() {
    try {
        console.log("Seeding data...")
        await User.deleteMany();
        await User.insertMany(await hashedUsersData);

        await Driver.deleteMany();
        await Driver.insertMany(driversData);

        await Team.deleteMany();
        await Team.insertMany(teamsData);

        await Sponsor.deleteMany();
        await Sponsor.insertMany(sponsorsData);

        await Race.deleteMany();
        await Race.insertMany(racesData);

        console.log('Data seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

