const Sequelize = require('sequelize')
const db = require('@database/database')

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true
})

module.exports = User