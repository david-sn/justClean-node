
let DataTemplate = require('../utils/templates.js');
let Validation = require('../validation/validation');

let { OfficeDetails, TowerDetails } = require('../config/connectionDB')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports.createOffice = async function (req, res) {
    let { error } = Validation.createOffice(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });


    //find the parent first, instead of make transaction
    TowerDetails.findOne({
        where: { id: req.body.towerId }
    }).then(function (towerDB) {
        if (towerDB && towerDB.dataValues&& towerDB.dataValues.id) {
            OfficeDetails.create({ description: req.body.description, office_code: req.body.code, name: req.body.name, number_of_chairs: req.body.numberOfChairs, floor: req.body.floor,towerDetailId:towerDB.dataValues.id})
                .then(savedOffice => {
                    // savedOffice.setTowerDetail(towerDB);
                    res.status(200).json(DataTemplate.responseTemplate("OK", savedOffice.dataValues, req.body.language));
                    //emit the change
                    req.io.emit('justCleanEvents', { event: "CREATR_OFFICE", result: savedOffice.dataValues });
                })
                .catch(e => {
                    res.status(500).json(DataTemplate.responseTemplate("ERROR", e, req.body.language));
                })
        } else {
            res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language))
        }
    });



}


module.exports.editOffice = async function (req, res) {
    req.body.id = req.query.id;
    let { error } = Validation.editOffice(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    //find the parent first, instead of make transaction
    TowerDetails.findOne({
        where: { id: req.body.towerId }
    }).then(function (towerDB) {
        if (towerDB && towerDB.dataValues) {
            OfficeDetails.update(
                { description: req.body.description, office_code: req.body.code, name: req.body.name, number_of_chairs: req.body.numberOfChairs, floor: req.body.floor, towerDetailId: towerDB.id },
                { where: { id: req.query.id } })
                .then(updatedOffice => {
                    if (updatedOffice[0] == 0) {
                        res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language));
                    } else {
                        res.status(200).json(DataTemplate.responseTemplate("OK", updatedOffice.dataValues, req.body.language));
                        //emit the change
                        req.io.emit('justCleanEvents', { event: "UPDATE_OFFICE", result: { id: req.query.id, description: req.body.description, office_code: req.body.code, name: req.body.name, number_of_chairs: req.body.numberOfChairs, floor: req.body.floor, towerDetailId: towerDB.id } });
                    }
                })
                .catch(e => {
                    res.status(500).json(DataTemplate.responseTemplate("ERROR", e, req.body.language));
                })
        } else {
            res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language))
        }
    });
}


module.exports.deleteOffice = async function (req, res) {
    let { error } = Validation.deleteTower(req.query);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });


    OfficeDetails.destroy({ where: { id: req.query.id } })
        .then(deletedOffice => {
            if (deletedOffice == 0)
                res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language));
            else {
                res.status(200).json(DataTemplate.responseTemplate("OK", deletedOffice, req.body.language));
                //emit the change
                req.io.emit('justCleanEvents', { event: "DELETE_OFFICE", result: { id: req.query.id } });
            }
        })
        .catch(e => {
            res.status(500).json(DataTemplate.responseTemplate("ERROR", e, req.body.language));
        })
}


module.exports.findOfficeById = async function (req, res) {
    let { error } = Validation.findTowerById(req.query);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    OfficeDetails.findOne({
        where: {
            id: req.query.id
        },
        include: [TowerDetails]
    }).then(function (result) {
        if (result && result.dataValues) {
            res.status(200).json(DataTemplate.responseTemplate("OK", result.dataValues, req.body.language))
        } else {
            res.status(200).json(DataTemplate.responseTemplate("DATA_NOT_FOUND", null, req.body.language))
        }
    });

}


module.exports.findAllOffices = async function (req, res) {
    let { error } = Validation.findAllOffices(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    OfficeDetails.findAndCountAll({
        include: [TowerDetails],
        order: [[req.body.sortKey, req.body.direction]],
        limit: req.body.pageSize,
        offset: (req.body.page) * req.body.pageSize
    }).then(function (result) {
        res.status(200).json(
            res.status(200).json(DataTemplate.responseTemplate("OK", result, req.body.language))
        );
    });

}

module.exports.searchOffices = async function (req, res) {
    let { error } = Validation.searchOffices(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    OfficeDetails.findAndCountAll(
        {
            where: Sequelize.or(
                { office_code: { [Op.like]: `%${req.body.value}%` } },
                { description: { [Op.like]: `%${req.body.value}%` } },
                { name: { [Op.like]: `%${req.body.value}%` } }
            ),
            include: [TowerDetails],
            order: [[req.body.sortKey, req.body.direction]],
            limit: req.body.pageSize,
            offset: (req.body.page) * req.body.pageSize
        }
    ).then(function (result) {
        res.status(200).json(
            res.status(200).json(DataTemplate.responseTemplate("OK", result, req.body.language))
        );
    });


}
