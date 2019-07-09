const {Sequelize} = require('sequelize');
const {AppConfig} = require('./AppConfig');

module.exports.SequelizeInstance = new Sequelize(
    AppConfig.DbConfig.database,
    AppConfig.DbConfig.username,
    AppConfig.DbConfig.password, {
        host: AppConfig.DbConfig.host,
        dialect: AppConfig.DbConfig.dialect,
        operatorsAliases: null,
        logging: true,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
);
