'use strict';
module.exports = (sequelize, DataTypes) => {
  const towerDetails = sequelize.define('towerDetails', {
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE,
    number_of_offices: DataTypes.INTEGER,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    avg_rating: DataTypes.DOUBLE
  }, {});
  towerDetails.associate = function(models) {
    // associations can be defined here
  };
  return towerDetails;
};