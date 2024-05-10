const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('account', 'root', 'P@s5w0rd', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;