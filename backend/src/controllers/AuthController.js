const {AuthService} = require('../services/AuthService');
const joi = require('@hapi/joi');

class AuthController {
    /**
     * @param {AuthService} service
     */
    constructor(service) {
        this.service = service;
    }

    // When using TypeScript all of these configs can be hidden behind decorators
    // When using IoC we need to instantiate new Controller per request to be able
    // to have some request specific data bound by using IoC
    setupRoutes = (server) => {
        server.route({
            path: '/auth/login',
            method: 'POST',
            handler: function(request, h) {
                return request.app.requestContainer.get(AuthController).login(request, h);
            },
            options: {
                validate: {
                    payload: joi.object().keys({
                        username: joi.string().required(),
                        password: joi.string().required(),
                    })
                }
            }
        });
    };

    login = async (request, h) => {
        return this.service.login(request.payload.username, request.payload.password);
    };
}

module.exports.AuthController = AuthController;
