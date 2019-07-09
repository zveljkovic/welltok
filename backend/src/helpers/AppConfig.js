const config = require('config');

class AppConfig {
    /** @returns {object} */
    static get DbConfig() {
        return config.get('DbConfig');
    }
}

module.exports.AppConfig = AppConfig;
