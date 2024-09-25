const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Area = sequelize.define("Area", {
  cod: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leader: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Area;
