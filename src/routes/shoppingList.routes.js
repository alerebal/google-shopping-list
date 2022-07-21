const router = require('express').Router()
const {
    addItemToCart
} = require('../controllers/shoppingList.controllers')

router.post('/addToCart/:id', addItemToCart)

module.exports = router