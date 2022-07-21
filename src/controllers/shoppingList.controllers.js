const slCtrl = {}
const User = require('../models/User')
const Item = require('../models/Item')

// Add an item to the Shopping list
slCtrl.addItemToCart = async(req, res) => {
    if (req.user) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const user = await User.findById(userId)
            user.shoppingList.push(id)
            user.save()
            res.status(200).json(id)
        } catch (error) {
            res.status(404).json({msg: 'The item has not been added to the cart'})
        }
    } else {
        res.json('no user')
    }
}

// Display cart on the screen
slCtrl.displayCart = async(req, res) => {
    if (req.user) {
        const {id} = req.user
        const user = await User.findById(id)
        const shoppingList = fillCartList(user.shoppingList)
        res.status(200).render('partials/cart-list', {shoppingList})
    } else {
        res.json('no user display cart')
    }
}

const fillCartList = itemsIdList => {
    const shoppingList = []
    itemsIdList.forEach(async itemId => {
        const item = await Item.findById(itemId)
        shoppingList.push(item)
    })
    return shoppingList
}

module.exports = slCtrl