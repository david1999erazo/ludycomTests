const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdayDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  area: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
