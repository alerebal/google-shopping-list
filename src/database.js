const {connect} = require('mongoose');

const userDb = process.env.USER_DB;
const keyDb = process.env.KEY_DB;
const db = process.env.DATABASE;
const url = `mongodb+srv://${userDb}:${keyDb}@cluster0.x2ibd.mongodb.net/${db}?retryWrites=true&w=majority`;


connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log(`Database ${db} is connected`))
    .catch(err => console.log(err));

module.exports = connect;