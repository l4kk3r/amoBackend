const Sequelize = require('sequelize')
const db = require('@database/database')

const Department = db.define('department', {
    title: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

const Hospital = db.define('hospital', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true
})

const Hopital_Department = db.define('Hopital_Department', {
    selfGranted: Sequelize.BOOLEAN
  }, { timestamps: false });

Hospital.belongsToMany(Department, { through: Hopital_Department })
Department.belongsToMany(Hospital, { through: Hopital_Department })

module.exports = Hospital
module.exports.Department = Department
module.exports.Hopital_Department = Hopital_Department