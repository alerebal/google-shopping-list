require('dotenv').config();

const app = require('./app');

const port = app.get('port');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;