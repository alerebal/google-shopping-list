const router = require('express').Router()
const {
    addItemToCart,
    displayCart
} = require('../controllers/shoppingList.controllers')

router.get('/cartList', displayCart)

router.post('/addToCart/:id', addItemToCart)

module.exports = router