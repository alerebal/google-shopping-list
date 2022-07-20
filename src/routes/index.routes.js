const router = require('express').Router();
const {
    home,
    error,
} = require('../controllers/index.controllers');

router.get('/', home)
router.get('/error', error)





module.exports = router