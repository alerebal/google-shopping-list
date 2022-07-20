const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session')
const path = require('path')

// Initialization
const app = express();
require('./database')

// Settings
app.set('port', process.env.PORT || 3000);

// Passport
require('./config/passport')(passport)

// Handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine("hbs", exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    // handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
}));
app.set('view engine', 'hbs')

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
app.use(require('./routes/auth.routes'))

// Static files
app.use('/public', express.static('src/public'));

module.exports = app