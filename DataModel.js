const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');

const DataModel = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accbal:{
    type: DataTypes.INTEGER,
    allowNull:false,
  }
});

module.exports = DataModel;