const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');
const LeaderModel=require('./LeaderModel')

const MemberModel = sequelize.define('members', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  members: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expenses:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
});
MemberModel.belongsTo(LeaderModel, { foreignKey: 'leaderid' });
module.exports = MemberModel;