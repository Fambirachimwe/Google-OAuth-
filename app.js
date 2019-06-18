const express =  require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['tatendafambirachimwe']
}));

app.use(passport.initialize());
app.use(passport.session());





mongoose.connect('mongodb://localhost/MongoTest', { useNewUrlParser: true });

mongoose.connection.once('open',() =>{
    console.log('connected');
}).on('error', (error)=>{
    console.log('Connection Error ', error);
});



app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/auth', authRoutes);


app.get('/', (req, res) =>{
    res.render('home');
    
});


passport.use('local-login', new LocalStrategy({

    function(username, password, done){
        User.findOne({usermane: username}).then((err, user) =>{
            if (err) { return done(err);}
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        })
    }

}))

app.post('/', passport.authenticate('local-login', {

    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages

}));



app.listen(3000, () =>{
    console.log('listening to port 3000');
});

