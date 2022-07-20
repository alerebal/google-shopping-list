const itemsCtrl = {}
const Item = require('../models/Item')

// Create an item
itemsCtrl.createItem = async (req, res) => {
    try {
        const {name, description, price} = req.body
        const item = new Item({name, description, price})
        item.save()
        res.status(200).json(item)
    } catch (error) {
        res.status(404).json({msg: 'Item has not been created'})
    }
} 

// Get all the items
itemsCtrl.getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({name: 1})
        res.status(200).json(items)
    } catch (error) {
        res.status(404).json({msg: 'Items not found'})
    }
}

module.exports = itemsCtrl