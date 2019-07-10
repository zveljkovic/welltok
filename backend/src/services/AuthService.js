const jwt = require('jsonwebtoken');
const {AppConfig} = require('../helpers/AppConfig');

class AuthService {
    async login(username, password) {
        if (username !== 'admin' || password !== 'admin'){
            return {status: 'error', errorMessage: 'Invalid username or password'};
        }
        const token = jwt.sign({ userId: 1, scopes: ['admin'], iss: 'welltok' }, AppConfig.JwtSecret);
        return {status: 'ok', token}
    }
}

module.exports.AuthService = AuthService;
