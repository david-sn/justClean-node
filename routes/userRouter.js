var express = require('express');
var router = express.Router();

let OfficeController = require('../controller/officeDetailController')
var userController = require('../controller/loginAndRegisterController');



passportService = require('../config/passport'), passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });


router.post('/oauth/token', requireLogin, userController.login);
router.post('/register', userController.registerUser);

module.exports = router;
