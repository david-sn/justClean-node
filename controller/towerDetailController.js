let DataTemplate = require('../utils/templates.js');
let Validation = require('../validation/validation');

let { TowerDetails } = require('../config/connectionDB')



module.exports.createTower = async function (req, res) {
    let { error } = Validation.createTower(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    TowerDetails.create({ name: req.body.name, lat: req.body.lat, lon: req.body.lon, number_of_offices: req.body.numberOfOffices, avg_rating: 0.00, location: req.body.location })
        .then(savedTower => {
            res.status(200).json(DataTemplate.responseTemplate("OK", savedTower.dataValues, req.body.language));
            //emit the change
            req.io.emit('justCleanEvents', { event: "CREATR_TOWER", result: savedTower.dataValues });
        })
        .catch(e => {
            res.status(500).json(DataTemplate.responseTemplate("ERROR", e, req.body.language));
        })
}


module.exports.editTower = async function (req, res) {
    req.body.id=req.query.id;    
    let { error } = Validation.editTower(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });


    TowerDetails.update(
        { name: req.body.name, lat: req.body.lat, lon: req.body.lon, number_of_offices: req.body.numberOfOffices, location: req.body.location },
        { where: { id: req.query.id } })
        .then(updatedTower => {
            if (updatedTower[0] == 0) {
                res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language));
            } else {
                res.status(200).json(DataTemplate.responseTemplate("OK", updatedTower, req.body.language));
                //emit the change
                req.io.emit('justCleanEvents', { event: "UPDATE_OFFICE", result: { id: req.query.id, name: req.body.name, lat: req.body.lat, lon: req.body.lon, number_of_offices: req.body.numberOfOffices, location: req.body.location } });
            }

        })
        .catch(e => {
            res.status(500).json(DataTemplate.responseTemplate("ERROR", e, req.body.language));
        })

}


module.exports.deleteTower = async function (req, res) {
    let { error } = Validation.deleteTower(req.query);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });


    TowerDetails.destroy({ where: { id: req.query.id } })
        .then(deletedTower => {
            if (deletedTower == 0)
                res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language));
            else {
                res.status(200).json(DataTemplate.responseTemplate("OK", deletedTower, req.body.language));
                //emit the change
                req.io.emit('justCleanEvents', { event: "DELETE_TOWER", result: { id: req.query.id } });
            }
        })
        .catch(e => {
            res.status(500).json(DataTemplate.responseTemplate("ERROR", e, req.body.language));
        })
}


module.exports.findTowerById = async function (req, res) {
    let { error } = Validation.findTowerById(req.query);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    TowerDetails.findOne({
        where: {
            id: req.query.id
        }
    }).then(function (result) {
        if (result && result.dataValues) {
            res.status(200).json(DataTemplate.responseTemplate("OK", result.dataValues, req.body.language))
        } else {
            res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language))
        }
    });
}


module.exports.findAllTowers = async function (req, res) {
    let { error } = Validation.findAllTowers(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    TowerDetails.findAndCountAll({
        order: [[req.body.sortKey, req.body.direction]],
        limit: req.body.pageSize,
        offset: (req.body.page) * req.body.pageSize,
    }).then(function (result) {
        res.status(200).json(
            res.status(200).json(DataTemplate.responseTemplate("OK", result, req.body.language))
        );
    });
}
