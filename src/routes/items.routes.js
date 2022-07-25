const router = require('express').Router();
const {
    createItem,
    getItems
} = require('../controllers/items.controllers');

router.get('/', getItems);

router.post('/createItem', createItem);

module.exports = router;