var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var keys = require('../security/keys');
let { UserDetails } = require('../config/connectionDB');



const bcrypt = require('bcrypt');


var localOptions = {
    usernameField: 'username'
};
//locale login /oauth/token
var localLogin = new LocalStrategy(localOptions, async function (username, password, done) {

    try {
        let user = await UserDetails.findOne({ where: { email: username } });
        if (!user && !user.dataValues) {
            return done(null, false, { message: 'Login failed. Please try again.' });
        }
        let isMatch = matchPassword(user.dataValues.password, password);
        if (!isMatch) {
            return done(null, false, { message: 'Login failed. Please try again.' });
        }
        return done(null, user.dataValues);
    } catch (err) {
        return done(null, false, { message: 'Login failed. Please try again.' });
    }
});


var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.publicKEY,
    algorithm: 'RS256'
};




var jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {//payload === info from token    
    let userDB = await UserDetails.findOne({ where: { id: payload.id } });
    if (userDB && userDB.dataValues) {
        return done(null, userDB.dataValues);
    } else {
        return done(null, false, { message: 'Login failed. Please try again.' });
    }
});

passport.use(jwtLogin);
passport.use(localLogin);


function matchPassword(encrptPassword, plaintextPassword) {
    return bcrypt.compareSync(plaintextPassword, encrptPassword)
}
