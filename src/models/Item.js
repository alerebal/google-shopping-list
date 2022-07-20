const {Schema, model} = require('mongoose')

const ItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, requiered: true}
})

module.exports = model('Item', ItemSchema)