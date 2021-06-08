const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL)

db.sync({ alter: true }).then(() => {
  console.log('Database syncronized');
});

module.exports = db