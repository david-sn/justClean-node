'use strict';
module.exports = (sequelize, DataTypes) => {
  const userDetails = sequelize.define('userDetails', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  userDetails.associate = function(models) {
    // associations can be defined here
  };
  return userDetails;
};