const Joi = require('@hapi/joi');

module.exports.registerUserValidation = function (body) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


module.exports.createTower = function (body) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        numberOfOffices: Joi.number().required(),
        location: Joi.string().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


module.exports.editTower = function (body) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        numberOfOffices: Joi.number().required(),
        location: Joi.string().required(),
        id: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


module.exports.deleteTower = function (body) {
    const schema = Joi.object().keys({
        id: Joi.number().required()

    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


module.exports.findTowerById = function (body) {
    const schema = Joi.object().keys({
        id: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


module.exports.findAllTowers = function (body) {
    const schema = Joi.object().keys({
        sortKey: Joi.any().valid(['name', 'location', 'id', 'number_of_offices']).required(),
        direction: Joi.any().valid(['DESC', 'ASC']).required(),
        page: Joi.number().required(),
        pageSize: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


//---------- Office Validation ---------

module.exports.createOffice = function (body) {
    const schema = Joi.object().keys({
        description: Joi.string().required(),
        code: Joi.string().required(),
        name: Joi.string().required(),
        numberOfChairs: Joi.number().required(),
        floor: Joi.string().required(),
        towerId: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}


module.exports.editOffice = function (body) {
    const schema = Joi.object().keys({
        description: Joi.string().required(),
        code: Joi.string().required(),
        name: Joi.string().required(),
        numberOfChairs: Joi.number().required(),
        floor: Joi.string().required(),
        id: Joi.number().required(),
        towerId: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}




module.exports.findAllOffices = function (body) {
    const schema = Joi.object().keys({
        sortKey: Joi.any().valid(['office_code','description','name' ,'floor', 'id', 'number_of_chairs']).required(),
        direction: Joi.any().valid(['DESC', 'ASC']).required(),
        page: Joi.number().required(),
        pageSize: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}

module.exports.searchOffices = function (body) {
    const schema = Joi.object().keys({
        value: Joi.string().required(),
        direction: Joi.string().valid(['DESC', 'ASC']).required(),
        sortKey: Joi.string().valid(['office_code','description','name' ,'floor', 'id', 'number_of_chairs']).required(),
        page: Joi.number().required(),
        pageSize: Joi.number().required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}