const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}))

// router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/error'}),
//     (req, res) => {
//         res.redirect('/')
//     })

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/error'}),
    (req, res) => {
        res.redirect('/')
    })

// router.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect('/')
// })

module.exports = router