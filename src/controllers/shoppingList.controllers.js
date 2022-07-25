const slCtrl = {};
const User = require('../models/User');
const {fillCartList, removeItemOnce, getItemsQty} = require('../helpers/helpers');
let noUserCart = [];
let noUser;

// Display cart on the screen
slCtrl.displayCart = async(req, res) => {
    if (req.user) {
        const {id} = req.user;
        const user = await User.findById(id);
        const shoppingList = await fillCartList(user.shoppingList);
        const shoppingListQty = getItemsQty(shoppingList);
        // send user to the template to manage the navbar's links
        res.status(200).render('partials/cart-list', {shoppingListQty, user});
    } else {
        noUser = await fillCartList(noUserCart);
        const noUserQty = getItemsQty(noUser);
        res.status(200).render('partials/cart-list', {noUserQty});
    }
};

// Display cart no user
slCtrl.displayCartNoUser = async(req, res) => {
    const cart = req.body;
    // Need to check if there is cart in localstorage, otherwise throws an error
    // After I had assign an empty array to cart in localstorage, I had no more this problem, I will keep this if just in case, but I think is no longer necesary.
    if (cart.cart != 'undefined') {
        const noUserArr = JSON.parse(cart.cart);
        noUserCart = noUserArr;
    }
    res.json('no user display');
};

// Add an item to the Shopping list
slCtrl.addItemToCart = async(req, res) => {
    try {
        if (req.user) {
            const {id} = req.params;
            const userId = req.user.id;
            const user = await User.findById(userId);
            user.shoppingList.push(id);
            user.save();
            res.status(200).json(id);
        } else {
            res.json('not user');
        }
    } catch (error) {
        res.status(404).render('partials/error');
    }
};

// Remove an item from the Shopping List
slCtrl.removeItemFromCart = async(req, res) => {
    try {
        if(req.user) {
            const {id} = req.params;
            const userId = req.user.id;
            const user = await User.findById(userId);
            const index = user.shoppingList.indexOf(id);
            const newList = removeItemOnce(user.shoppingList, index);
            user.shoppingList = newList;
            await user.save();
            res.status(200).json(user.shoppingList);
        } else {
            const {id} = req.params;
            const index = noUserCart.indexOf(id);
            noUserCart = removeItemOnce(noUserCart, index);
            res.status(200).json({noUserCart, user: 'not user'});
        }
    } catch (error) {
        res.status(404).render('partials/error');
    }    
};

// Remove all the items
slCtrl.removeAllItems = async(req, res) => {
    try {
        if (req.user) {
            const {id} = req.user;
            const user = await User.findById(id);
            user.shoppingList = [];
            await user.save();
            res.status(200).json(user.shoppingList);
        } else {
            noUserCart = [];
            res.json('not user');
        }
    } catch (error) {
        res.status(404).render('partials/error');
    }
};


module.exports = slCtrl;