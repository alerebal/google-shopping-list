const slCtrl = {}
const User = require('../models/User')

// Add an item to the Shopping list
slCtrl.addItemToCart = async(req, res) => {
    if (req.user) {
        console.log('is user')
        try {
            const {id} = req.params
            const userId = req.user.id
            const user = await User.findById(userId)
            user.shoppingList.push(id)
            user.save()
            console.log(user)
            res.json('user')
        } catch (error) {
            res.status(404).json({msg: 'The item has not been added to the cart'})
        }
    } else {
        console.log('no user')
        res.json('no user')
    }
    
}

module.exports = slCtrl