const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');
const LeaderModel=require('./LeaderModel')


const SettleModel = sequelize.define('settle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    member: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payfor: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
SettleModel.belongsTo(LeaderModel, { foreignKey: 'leaderid',allowNull:false });
module.exports = SettleModel;