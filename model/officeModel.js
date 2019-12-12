module.exports = (sequelize, type) => {
    return sequelize.define('officeDetails', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        office_code: type.STRING,
        description: type.STRING,
        name: type.STRING,
        number_of_chairs: type.INTEGER,
        floor: type.STRING         
    })
}