const jwt = require('jsonwebtoken');
const {AppConfig} = require('../helpers/AppConfig');

class Auth {
    static get schemeName() { return 'Auth'; }
    static get strategyName() { return 'Auth'; }
    scheme = (server, options) => ({authenticate: this.authenticate});

    authenticate = async (request, h) => {
        const authHeader = request.headers['authorization'];
        if (!authHeader.startsWith('Bearer ')) {
            return h.unauthenticated('No bearer');
        }
        const token = authHeader.substring(7);
        let payload = null;
        try {
            payload = jwt.verify(token, AppConfig.JwtSecret, {algorithms: ['HS256']});
        } catch (e) {
            return h.unauthenticated(e);
        }
        return h.authenticated({
            credentials: {
                scope: payload.scopes,
            },
            artifacts: null,
        });
    }
}
module.exports.Auth = Auth;
