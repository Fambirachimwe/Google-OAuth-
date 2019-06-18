const router = require('express').Router();
const passport = require('passport');



router.get('/google',passport.authenticate('google', {
    scope: ['profile', 'email'],
}));


router.get('/facebook', (req,res) =>{
    res.send('loggin in with facebook');
});



module.exports = router;


