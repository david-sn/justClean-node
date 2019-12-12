
const Sequelize = require('sequelize');

const UsersModel = require('../model/usersModel')
const OfficeModel = require('../model/officeModel')
const TowerModel = require('../model/towerModel')

var sequelize = new Sequelize('mysql://root:root@localhost:3306/jc', {
})


const UserDetails = UsersModel(sequelize, Sequelize)
const TowerDetails = TowerModel(sequelize, Sequelize)
const OfficeDetails = OfficeModel(sequelize, Sequelize)

OfficeDetails.belongsTo(TowerDetails)


sequelize.sync({ force: false })
    .then(() => seed())
    .then(() => TowerDetails.findOne({
        where: {
            name: 'tower1'
        }
    }))
    .catch(error => console.log(error));



const seed = () => {
    return Promise.all([
        TowerDetails.create({ name: 'tower1', lat: 30.3654, lon: 31.24525, number_of_offices: 5, avg_rating: 3.30, location: "Kuwait" }),
        TowerDetails.create({ name: 'tower2', lat: 22.222, lon: 22.24525, number_of_offices: 22, avg_rating: 2.22, location: "UAE" }),

        OfficeDetails.create({ name: 'office1', office_code: '101', description: "Sea view", number_of_chairs: 20, floor: '1st' }),
        OfficeDetails.create({ name: 'office2', office_code: '202', description: "Street view", number_of_chairs: 20, floor: '2nd' }),
        OfficeDetails.create({ name: 'office3', office_code: '303', description: "Garden view", number_of_chairs: 20, floor: '3rd' }),
        OfficeDetails.create({ name: 'office4', office_code: '404', description: "Pool view", number_of_chairs: 20, floor: '4th' }),
        OfficeDetails.create({ name: 'office5', office_code: '505', description: "No view", number_of_chairs: 20, floor: '5th' }),
        OfficeDetails.create({ name: 'office6', office_code: '606', description: "Closed view", number_of_chairs: 20, floor: '6th' }),
    ]).then(([T1, T2, O1, O2, O3, O4, O5, O6]) => {
        return Promise.all([
            O1.setTowerDetail(T1),
            O2.setTowerDetail(T1),
            O3.setTowerDetail(T1),
            O4.setTowerDetail(T2),
            O5.setTowerDetail(T2),
            O6.setTowerDetail(T2)
        ]);
    }).catch(error => console.log(error));
};



module.exports = {
    UserDetails,
    TowerDetails,
    OfficeDetails
}