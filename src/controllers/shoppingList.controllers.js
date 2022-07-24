const slCtrl = {}
const User = require('../models/User')
const Item = require('../models/Item')
let noUserCart = []
let noUser;

// Display cart on the screen
slCtrl.displayCart = async(req, res) => {
    if (req.user) {
        const {id} = req.user
        const user = await User.findById(id)
        const shoppingList = await fillCartList(user.shoppingList)
        res.status(200).render('partials/cart-list', {shoppingList, user})
    } else {
        noUser = await fillCartList(noUserCart)
        res.status(200).render('partials/cart-list', {noUser})
    }
}

// Display cart no user
slCtrl.displayCartNoUser = async(req, res) => {
    const cart = req.body
    // Need to check if there is cart in localstorage, otherwise throws an error
    if (cart['cart'] != 'undefined') {
        const noUserArr = JSON.parse(cart['cart'])
        noUserCart = noUserArr
    }
    res.json('no user display')
}

// Add an item to the Shopping list
slCtrl.addItemToCart = async(req, res) => {
    try {
        // If user is login with Google
        if (req.user) {
            const {id} = req.params
            const userId = req.user.id
            const user = await User.findById(userId)
            user.shoppingList.push(id)
            user.save()
            res.status(200).json(id)
        } else {
            res.json('not user')
        }
    } catch (error) {
        console.error(error)
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
            const {id} = req.params
            const index = noUserCart.indexOf(id)
            noUserCart = removeItemOnce(noUserCart, index)
            res.status(200).json({noUserCart, user: 'not user'})
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
            noUserCart = []
            res.json('not user')
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