const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

module.exports = {
  HOST: DB_HOST,
  PORT: DB_PORT,
  DATABASE: DB_DATABASE,
  USERNAME: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  dialect: DB_DIALECT,
};
