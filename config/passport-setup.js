const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({

    clientID: '338113355382-p1pmpgso41ottn1iinpseg7facdecq6s.apps.googleusercontent.com', 
    clientSecret: 'vS91kU8K4637PA341Pdv1-mq',
    callbackURL: 'http://127.0.0.1:3000/auth/google/redirect',
    },
    (req, accessToken, refreshToken, profile, done) =>{

        process.nextTick(() =>{
           console.log(profile); 
        });
    }
));