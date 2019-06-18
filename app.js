const express =  require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');



app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/auth', authRoutes);


app.get('/', (req, res) =>{
    res.render('home');
    
});



app.listen(3000, () =>{
    console.log('listening to port 3000');
});

