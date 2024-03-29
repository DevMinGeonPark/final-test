const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "+09:00",
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

let db = [];

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
//   .forEach((file) => {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });
.forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

const Wkt = require("terraformer-wkt-parser");
Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
  return "ST_GeomFromText(" + options.escape(Wkt.convert(value)) + ")";
};
Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
  return "ST_GeomFromText(" + options.escape(Wkt.convert(value)) + ")";
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;