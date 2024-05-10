const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');
const LeaderModel=require('./LeaderModel')


const EventModel = sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
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
    }
});
EventModel.belongsTo(LeaderModel, { foreignKey: 'leaderid',allowNull:false });
module.exports = EventModel;