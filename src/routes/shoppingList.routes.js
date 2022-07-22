const router = require('express').Router()
const {
    addItemToCart,
    displayCart,
    removeItemFromCart
} = require('../controllers/shoppingList.controllers')

router.get('/cartList', displayCart)

router.post('/addToCart/:id', addItemToCart)

router.post('/removeFromCart/:id', removeItemFromCart)

module.exports = router