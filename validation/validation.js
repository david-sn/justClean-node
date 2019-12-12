const Joi = require('@hapi/joi');

////--------BEGIN USER MANAGMENT---------///
module.exports.registerUserValidation = function (body) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });
    return Joi.validate(body, schema, { allowUnknown: true });
}
