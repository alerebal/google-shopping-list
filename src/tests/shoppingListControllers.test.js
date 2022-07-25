const axios = require('axios');
const {addItemToCart} = require('../controllers/shoppingList.controllers');

jest.mock('axios');

describe('Testing shopping list controllers', () => {
    beforeAll(() => {
        item = {
            id: '62d82593da8f8fd11e360ea1',
            name: 'Item2',
            description: 'Item2 descrition',
            price: 5
        };
    });
    test('should add an item to the cart', async () => {
        const resp = '62d82593da8f8fd11e360ea1';
        await axios.get.mockResolvedValue(resp);

        return addItemToCart().then(data => expect(data).toEqual(item.id))
                              .catch(error => expect(error).toEqual(error));
    });
});

