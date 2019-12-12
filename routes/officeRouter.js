var express = require('express');
var router = express.Router();

let OfficeController = require('../controller/officeDetailController')


router.post('/createOffice', OfficeController.createOffice );
router.delete('/deleteOffice', OfficeController.deleteOffice );
router.put('/editOffice', OfficeController.editOffice );
router.post('/findAllOffices', OfficeController.findAllOffices );
router.get('/findOfficeById', OfficeController.findOfficeById );
router.post('/searchOffices', OfficeController.searchOffices );


module.exports = router;
