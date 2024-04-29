const mongoose = require('mongoose');

module.exports = () => {
    console.log("Connecting to db...");

    mongoose
        .connect(process.env.MONGODB_URI)
        .then((value) => {
            console.log('Mongodb connected....', value.connection.readyState);
        })
        .catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(
                'Mongoose connection is disconnected due to app termination...'
            );
            process.exit(0);
        });
    });
};
