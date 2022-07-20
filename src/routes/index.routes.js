const router = require('express').Router();
const {
    home
} = require('../controllers/index.controllers');

router.get('/', home)


module.exports = router