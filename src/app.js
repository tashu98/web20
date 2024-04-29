var createError = require('http-errors');
var express = require('express');
var path = require('path');
const dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var viewsRouter = require('./routes/base');
var driversRouter = require('./routes/drivers');
var teamsRouter = require('./routes/teams');
var racesRouter = require('./routes/races');
var sponsorsRouter = require('./routes/sponsors');

const {verifyLoggedIn} = require("./middleware/auth");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./initDb')();

// Routing
app.use('/drivers', verifyLoggedIn, driversRouter)
app.use('/teams', verifyLoggedIn, teamsRouter)
app.use('/sponsors', verifyLoggedIn, sponsorsRouter);
app.use('/races', verifyLoggedIn, racesRouter);
app.use('/', viewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
