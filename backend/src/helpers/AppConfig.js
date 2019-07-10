const config = require('config');

class AppConfig {
    /** @returns {object} */
    static get DbConfig() {
        return config.get('DbConfig');
    }

    /** @returns {object} */
    static get JwtSecret() {
        return config.get('JwtSecret');
    }
}

module.exports.AppConfig = AppConfig;
