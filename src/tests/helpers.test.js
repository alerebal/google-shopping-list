const helpers = require('../helpers/helpers')

describe("Helpers test", () => {
    beforeAll(() => {
        first = {
            id: '62d824e7893874e42b168f13',
            name: 'Item1',
            description: 'Item1 description',
            price: 3
        }
        second = {
            id: '62d82593da8f8fd11e360ea1',
            name: 'Item2',
            description: 'Item2 descrition',
            price: 5
        }
        arrOfIds = [first.id,second.id,first.id]
        index = arrOfIds.indexOf(first.id)
        arrOfObjs = [first, first, second, first]
    })
    
    test("given an item id, the function should return an array of objects in which the item has been taken out", () => {
        expect(helpers.removeItemOnce(arrOfIds, index)).toEqual([second.id,first.id])
    })

    test("given an array of item objects, return an array with the quantity of an item, if there are two same items, should return total amount of both ", () => {
        expect(helpers.getItemsQty(arrOfObjs).length).toBe(2);
        expect(helpers.getItemsQty(arrOfObjs)).toEqual(
    [
        {
            id: '62d824e7893874e42b168f13',
            name: 'Item1',
            description: 'Item1 description',
            price: 3,
            qty: 3,
            total: 9
        },
        {
            id: '62d82593da8f8fd11e360ea1',
            name: 'Item2',
            description: 'Item2 descrition',
            price: 5,
            qty: 1,
            total: 5
        }
    ])
    });
})
