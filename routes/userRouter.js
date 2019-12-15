var express = require('express');
var router = express.Router();
var userController = require('../controller/loginAndRegisterController');



let passportService = require('../config/passport');
let passport = require('passport');

let requireLogin = passport.authenticate('local', { session: false });


router.post('/oauth/token', requireLogin, userController.login);
router.post('/register', userController.registerUser);

module.exports = router;
