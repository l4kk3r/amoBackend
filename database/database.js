const Sequelize = require('sequelize');

const db = new Sequelize('hospaltrip', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

db.sync({ alter: true }).then(() => {
  console.log('Database syncronized');
});

module.exports = db