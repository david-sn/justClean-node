var express = require('express');
var router = express.Router();
let passport = require('passport');


let TowerController = require('../controller/towerDetailController')
var requireAuth = passport.authenticate('jwt', { session: false })

router.post('/createTower', requireAuth, TowerController.createTower);
router.delete('/deleteTower', requireAuth, TowerController.deleteTower);
router.put('/editTower', requireAuth, TowerController.editTower);
router.post('/findAllTowers', TowerController.findAllTowers);
router.get('/findTowerById', TowerController.findTowerById);


module.exports = router;
