const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session')

// Initialization
const app = express();
require('./database')

// Settings
app.set('port', process.env.PORT || 3000);

// Passport
require('./config/passport')(passport)

// Middlewares
app.use(session({
    secret: process.env.KEY_EXP_SESSIONS,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(require('./routes/index.routes'))

module.exports = app