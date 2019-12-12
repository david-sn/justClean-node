var express = require('express');
var router = express.Router();
let passport = require('passport');

let OfficeController = require('../controller/officeDetailController')
var requireAuth = passport.authenticate('jwt', { session: false })


router.post('/createOffice', requireAuth, OfficeController.createOffice);
router.delete('/deleteOffice', requireAuth, OfficeController.deleteOffice);
router.put('/editOffice', requireAuth, OfficeController.editOffice);
router.post('/findAllOffices', OfficeController.findAllOffices);
router.get('/findOfficeById', OfficeController.findOfficeById);
router.post('/searchOffices', OfficeController.searchOffices);


module.exports = router;
