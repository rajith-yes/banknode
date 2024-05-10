const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');

const AccountModel = sequelize.define('details', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  type:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  date:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  bal:{
    type: DataTypes.INTEGER,
    allowNull:false,
  }
});

module.exports = AccountModel;