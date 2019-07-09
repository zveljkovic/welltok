const {AppConfig} = require('./src/helpers/AppConfig');

module.exports = {
  [process.env.NODE_ENV]: AppConfig.DbConfig,
};
