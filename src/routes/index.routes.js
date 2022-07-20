const router = require('express').Router();
const passport = require('passport');
const {
    home,
    error
} = require('../controllers/index.controllers');

router.get('/', home)
router.get('/error', error)

router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}))

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/error'}),
    (req, res) => {
        res.redirect('/')
    })

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/error'}),
    (req, res) => {
        res.redirect('/')
    })


module.exports = router