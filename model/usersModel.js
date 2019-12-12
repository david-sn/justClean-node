module.exports = (sequelize, type) => {
    return sequelize.define('userDetails', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING,
        password: type.STRING 
    })
}