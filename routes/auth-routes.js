const router = require('express').Router();
const passport = require('passport');



router.get('/google',passport.authenticate('google', {
    scope: ['profile', 'email'],
}));






router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    res.send('redirecting from google conscent screen');

});


router.get('/facebook', (req,res) =>{
    res.send('loggin in with facebook');
});



module.exports = router;


