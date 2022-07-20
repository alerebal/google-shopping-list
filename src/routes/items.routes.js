const router = require('express').Router();
const {
    createItem,
    getItems
} = require('../controllers/items.controllers')

router.get('/getItems', getItems)

router.post('/createItem', createItem)

module.exports = router