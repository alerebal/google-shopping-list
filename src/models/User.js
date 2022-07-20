const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    googleId: {type: String, required: true},
    displayName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('User', UserSchema)