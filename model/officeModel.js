module.exports = (sequelize, type) => {
  var office= sequelize.define('officeDetails', {
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

  office.afterCreate(function(o){

    console.log('----+++++++-+-+-+-+-+-+-+-+-+-+-+-',o);
    
  });

  return office;
}
