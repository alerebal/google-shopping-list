const router = require('express').Router();
const passport = require('passport');

// Google authentiction link
router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}))

// Google auth callback
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/error'}),
    (req, res) => {
        res.redirect('/')
    })

// user logout and redirect to home
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    });
})

module.exports = router