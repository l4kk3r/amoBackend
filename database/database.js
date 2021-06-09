const Sequelize = require('sequelize');

db = null;
db = new Sequelize(process.env.DATABASE_URL,
          {
            dialect: "postgres",
            protocol: "postgres",
            port: 5432,
            host: "hospaltrip.herokuapp.com",
            logging: false,
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false
              }
            }
});

db.sync({ alter: true }).then(() => {
  console.log('Database syncronized');
});

module.exports = db