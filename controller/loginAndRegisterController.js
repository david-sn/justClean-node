let DataTemplate = require('../utils/templates.js');
let Validation = require('../validation/validation');
let { UserDetails } = require('../config/connectionDB')

const bcrypt = require('bcrypt');
var keys = require('../security/keys');
let jwt = require('jsonwebtoken');
let authConfig = require('../config/auth-config');



module.exports.login = async function (req, res) {
    res.status(200).json(
        await DataTemplate.responseTemplate("OK", {
            access_token: generateToken(req.user),
            token_type: 'Bearer',
            expires_in: authConfig.tokenTime,
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            }
        }, req.body.language)
    );
}



module.exports.registerUser = async function (req, res) {
    let { error } = Validation.registerUserValidation(req.body);
    if (error)
        return res.status(400).json({ status: "BAD_REQUEST", message: error.details[0].message });

    if (req.body.email) {
        let isUserFound = await UserDetails.findOne({ where: { email: req.body.email } });
        if (isUserFound && isUserFound.dataValues) {
            return res.status(200).json(await DataTemplate.responseTemplate("DATA_EXIST", null, req.body.language, null));
        }
    }

    UserDetails.create({
        name: req.body.name, email: req.body.email, password: hashPassword(req.body.password)
    }).then(async result => {
        if (result && result.dataValues) {
            res.status(200).json(await DataTemplate.responseTemplate("OK", {
                access_token: generateToken(result.dataValues),
                token_type: 'Bearer',
                expires_in: authConfig.tokenTime,
            }, req.body.language));
        } else {
            res.status(500).json(await DataTemplate.responseTemplate(false, "ERROR", null, req.body.language));
        }
    }).catch(async e => {
        res.status(500).json(await DataTemplate.responseTemplate(false, "ERROR", e, req.body.language));
    });
}


function generateToken(userData) {
    return jwt.sign(setUserInfo(userData), keys.privateKEY, { algorithm: 'RS256', expiresIn: authConfig.tokenTime });
}
function hashPassword(plaintextPassword) {
    return bcrypt.hashSync(plaintextPassword, 10);
}
function setUserInfo(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}
