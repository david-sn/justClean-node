var express = require('express');
var router = express.Router();

let TowerController = require('../controller/towerDetailController')


router.post('/createTower', TowerController.createTower );
router.delete('/deleteTower', TowerController.deleteTower );
router.put('/editTower', TowerController.editTower );
router.post('/findAllTowers', TowerController.findAllTowers );
router.get('/findTowerById', TowerController.findTowerById );


module.exports = router;
