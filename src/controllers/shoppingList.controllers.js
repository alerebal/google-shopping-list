const slCtrl = {}
const User = require('../models/User')
const Item = require('../models/Item')

// Display cart on the screen
slCtrl.displayCart = async(req, res) => {
    if (req.user) {
        const {id} = req.user
        const user = await User.findById(id)
        const shoppingList = await fillCartList(user.shoppingList)
        res.status(200).render('partials/cart-list', {shoppingList})
    } else {
        res.json('no user display cart')
    }
}

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

// Remove an item from the Shopping List
slCtrl.removeItemFromCart = async(req, res) => {
    try {
        if(req.user) {
            const {id} = req.params
            const userId = req.user.id
            const user = await User.findById(userId)
            const index = user.shoppingList.indexOf(id)
            const newList = removeItemOnce(user.shoppingList, index)
            user.shoppingList = newList
            await user.save()
            res.status(200).json(user.shoppingList)
        } else {
            res.json('not user inside try')
        }
    } catch (error) {
        console.error(error)
    }    
}

// Remove all the items
slCtrl.removeAllItems = async(req, res) => {
    try {
        if (req.user) {
            const {id} = req.user
            const user = await User.findById(id)
            user.shoppingList = []
            await user.save()
            res.status(200).json(user.shoppingList)
        } else {
            res.json('not user inside try')
        }
    } catch (error) {
        console.error(error)
    }
}

async function fillCartList(itemsIdList) {
    const shoppingList = []
    for (let itemId of itemsIdList) {
        const item = await Item.findById(itemId)
        shoppingList.push(item)
    }
    return shoppingList
}

function removeItemOnce(arr, index) {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

module.exports = slCtrl