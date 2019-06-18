const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    googleId: String,
    email: String,
})

const User = mongoose.model('User', UserSchema)


passport.serializeUser((user, done) =>{
    done(user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then((user) =>{
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: '338113355382-p1pmpgso41ottn1iinpseg7facdecq6s.apps.googleusercontent.com', 
    clientSecret: 'vS91kU8K4637PA341Pdv1-mq',
    callbackURL: 'http://127.0.0.1:3000/auth/google/redirect',
    passReqToCallback : true,

    },
    (req, accessToken, refreshToken, profile, done) =>{

        process.nextTick(() =>{
        //    console.log(profile); 
        User.findOne({googleId:profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user in the system ', currentUser);
            }
            else{
                new User({
                    username: profile.displayName,
                    id: profile.id,
                    email: (profile.emails[0].value || '').toLowerCase(),
                }).save().then((newUser) =>{
                    console.log('new User created ', newUser);
                }
                )}
        })
            
        });
    }
));