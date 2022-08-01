const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: "postgres",
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports = sequelize;
