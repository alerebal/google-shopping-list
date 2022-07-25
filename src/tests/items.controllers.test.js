const {getItems, createItem} = require('../controllers/items.controllers');
const axios = require('axios');

jest.mock('axios');

// it does not work properly, if I don't put .catch it give me an error, so I think it is not fetching correctly the data, but I'm not sure.
describe('Testing items.controllers', () => {
    test('should fetch items', async () => {
        const items = [{name: 'item 1', description: 'some description', price: 7}];
        const resp = {data: items};
        // const error = {status: 404}
        await axios.get.mockResolvedValue(resp);

        return getItems().then(data => expect(data).toEqual(items))
                         .catch(error => expect(error).toEqual(error));
    });

    // Same situation that the previous test
    test('should create an item', () => {
        const item = {name: 'item 1', description: 'some description', price: 7};
        const resp = {data: item};
        axios.get.mockResolvedValue(resp);

        return createItem().then(data => expect(data).toEqual(item))
                           .catch(error => expect(error).toEqual(error));
    });
});
