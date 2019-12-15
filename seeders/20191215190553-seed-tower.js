'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return seed(queryInterface);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('officeDetails', null, {});
    return queryInterface.bulkDelete('towerDetails', null, {});
  }
};

function seed(queryInterface) {
  return Promise.all([
    //to get 2 promises for each insertion
    queryInterface.bulkInsert('towerDetails', [
      { name: 'tower1', lat: 30.3654, lon: 31.24525, number_of_offices: 5, avg_rating: 3.30, location: "Kuwait", createdAt: new Date(), updatedAt: new Date() },
    ]),
    queryInterface.bulkInsert('towerDetails', [
      { name: 'tower2', lat: 22.222, lon: 22.24525, number_of_offices: 22, avg_rating: 2.22, location: "UAE", createdAt: new Date(), updatedAt: new Date() }
    ])

  ]).then(([T1, T2]) => {
    console.log(T1, '---------------------------', T2);

    return Promise.all([
      queryInterface.bulkInsert('officeDetails', [
        { name: 'office1', office_code: '101', description: "Sea view", number_of_chairs: 20, floor: '1st', towerDetailId: T1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'office2', office_code: '202', description: "Street view", number_of_chairs: 20, floor: '2nd', towerDetailId: T1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'office3', office_code: '303', description: "Garden view", number_of_chairs: 20, floor: '3rd', towerDetailId: T1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'office4', office_code: '404', description: "Pool view", number_of_chairs: 20, floor: '4th', towerDetailId: T2, createdAt: new Date(), updatedAt: new Date() },
        { name: 'office5', office_code: '505', description: "No view", number_of_chairs: 20, floor: '5th', towerDetailId: T2, createdAt: new Date(), updatedAt: new Date() },
        { name: 'office6', office_code: '606', description: "Closed view", number_of_chairs: 20, floor: '6th', towerDetailId: T2, createdAt: new Date(), updatedAt: new Date() }
      ])
    ]);
  }).catch(error => console.log(error));
};
