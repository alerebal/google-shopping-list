const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        };
        try {
            let user = await User.findOne({googleId: profile.id});
            if (user) {
                done(null, user);
            } else {
                user = new User(newUser);
                user.save();
                done(null, user);
            }
        } catch (error) {
            console.error(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

