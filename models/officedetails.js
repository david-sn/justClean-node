'use strict';
module.exports = (sequelize, DataTypes) => {
  const officeDetails = sequelize.define('officeDetails', {
    number_of_chairs: DataTypes.INTEGER,
    floor: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    office_code: DataTypes.STRING,
    towerDetailId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'towerDetails',
          schema: 'schema'
        },
        key: 'id'
      },
      allowNull: false
    }
  }, {});
  officeDetails.associate = function (models) {
    // associations can be defined here
    officeDetails.belongsToMany(models.towerDetails)
  };
  return officeDetails;
};