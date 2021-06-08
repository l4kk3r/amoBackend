const Sequelize = require('sequelize');

db = null;
db = new Sequelize('postgres://ubjldtflxufkxe:5c19cbe147b67e9d15179c6ef92f2477bfa7821bd1760c806b7c805452d18446@ec2-52-213-119-221.eu-west-1.compute.amazonaws.com:5432/dac92pegjkq5ls',
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