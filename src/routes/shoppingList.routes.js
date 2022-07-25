const router = require('express').Router();
const {
    addItemToCart,
    displayCart,
    displayCartNoUser,
    removeItemFromCart,
    removeAllItems
} = require('../controllers/shoppingList.controllers');

router.get('/cartList', displayCart);

router.post('/addToCart/:id', addItemToCart);
router.post('/cartListNoUser', displayCartNoUser);

router.delete('/removeFromCart/:id', removeItemFromCart);
router.delete('/removeAllItems', removeAllItems);

module.exports = router;