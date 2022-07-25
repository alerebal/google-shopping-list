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

// Get the quantity and total price of each item
helpers.getItemsQty = (arrOfObjects) => {
    let arrWithQty = {}
    for (let item of arrOfObjects) {
        if (arrWithQty.hasOwnProperty(item.id)) {
            arrWithQty[item.id] = {
                id: item.id,
                name: item.name,
                description : item.description,
                price: item.price,
                qty: arrWithQty[item.id]['qty'] += 1,
                total: arrWithQty[item.id]['qty'] * arrWithQty[item.id]['price']
            }
        } else {
            arrWithQty[item.id] = {
                id: item.id,
                name: item.name,
                description : item.description,
                price: item.price,
                qty: 1,
                total: item.price
            }
        }
    }
    return Object.values(arrWithQty)
}

module.exports = helpers