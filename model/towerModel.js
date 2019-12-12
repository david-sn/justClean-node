module.exports = (sequelize, type) => {
    return sequelize.define('towerDetails', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        lat: type.DOUBLE,
        lon: type.DOUBLE,
        number_of_offices: type.INTEGER,
        avg_rating: type.DOUBLE,
        location: type.STRING,
    })
}