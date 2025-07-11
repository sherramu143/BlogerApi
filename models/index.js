const dbConfig = require("../config/db.js");
console.log('dbconfig:,',dbConfig)
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users=require("./users.model.js")(sequelize, Sequelize);
db.posts=require("./posts.model.js")(sequelize,Sequelize);
module.exports = db;
