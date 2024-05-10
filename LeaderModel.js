const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');

const LeaderModel = sequelize.define('leaders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  leader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventname: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
module.exports = LeaderModel;