const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../config/models');

passport.serializeUser((user, done) =>{
    done(user.id);
});

passport.deserializeUser((id,done) =>{
    User.findById(id).then((User) =>{
        done(null, user);
    });
});




passport.use(
    new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://127.0.0.1:3000/auth/google/redirect',
        
    },

    (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        User.findOne({googleId: profile.id}).then((currenUser) =>{
            if(currenUser){
                console.log('user already in the system',currenUser);
            }
            else{
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) =>{
                    console.log('new user created ', newUser );
                });
            }
        })
    }
));

passport.use(
    new FacebookStrategy({
    clientID: '512186629517088',
    clientSecret: 'bd3f0eff454fe21387e817dff53af827',
    callbackURL: 'https://127.0.0.1:3000/auth/facebook/redirect'
        
    },

    (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        
    }
));


