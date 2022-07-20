const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Routes
app.use(require('./routes/index.routes'))

module.exports = app