const helpers = {}
const Item = require('../models/Item')

// Fill the response with and array of item objects.
helpers.fillCartList = async(itemsIdList) => {
    const shoppingList = []
    for (let itemId of itemsIdList) {
        const item = await Item.findById(itemId)
        shoppingList.push(item)
    }
    return shoppingList
}

// Remove an item from the cart or any array.
helpers.removeItemOnce = (arr, index) => {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

module.exports = helpers