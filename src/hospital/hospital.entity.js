const Sequelize = require('sequelize')
const db = require('@database/database')

const Hospital = db.define('hospital', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    departments: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
}, {
    timestamps: true
})


module.exports = Hospital