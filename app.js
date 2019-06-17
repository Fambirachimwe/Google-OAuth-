// setting up an ejs app

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');






app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['tatendaFambirachimwe']
}));


app.use(passport.initialize());
app.use(passport.session());


// database

mongoose.connect('mongodb://localhost/inspiTest', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connected');
}).on('error', console.error.bind(console, 'connection error'));









app.get('/', (req, res) =>{
    res.render('home.ejs');
});





app.listen(3000, ()=>{
    console.log("listening  to port 3000");
});


