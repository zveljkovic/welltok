const {BookService} = require('../services/BookService');
const joi = require('@hapi/joi');

class BookController {
    /**
     * @param {BookService} service
     */
    constructor(service) {
        this.service = service;
    }

    // When using TypeScript all of these configs can be hidden behind decorators
    // When using IoC we need to instantiate new Controller per request to be able
    // to have some request specific data bound by using IoC
    setupRoutes = (server) => {
        server.route({
            path: '/book',
            method: 'GET',
            handler: function(request, h) {
                return request.app.requestContainer.get(BookController).getAll(request, h);
            }
        });
        server.route({
            path: '/book/{id}',
            method: 'GET',
            handler: function(request, h) {
                return request.app.requestContainer.get(BookController).getById(request, h);
            },
            options: {
                validate: {
                    params: joi.object().keys({
                        id: joi.number().min(0).required()
                    })
                }
            }
        });
        server.route({
            path: '/book',
            method: 'POST',
            handler: function(request, h) {
                return request.app.requestContainer.get(BookController).create(request, h);
            },
            options: {
                validate: {
                    payload: joi.object().keys({
                        title: joi.string().required(),
                        description: joi.string().required(),
                        author: joi.string().required(),
                        tags: joi.array().items(joi.string()).required(),
                    })
                }
            }
        });
        server.route({
            path: '/book/{id}',
            method: 'PATCH',
            handler: function(request, h) {
                return request.app.requestContainer.get(BookController).update(request, h);
            },
            options: {
                validate: {
                    params: joi.object().keys({
                        id: joi.number().min(0).required()
                    }),
                    payload: joi.object().keys({
                        title: joi.string().required(),
                        description: joi.string().required(),
                        author: joi.string().required(),
                        tags: joi.array().items(joi.string()).required(),
                    })
                }
            }
        });
        server.route({
            path: '/book/{id}',
            method: 'DELETE',
            handler: function(request, h) {
                return request.app.requestContainer.get(BookController).delete(request, h);
            },
            options: {
                validate: {
                    params: joi.object().keys({
                        id: joi.number().min(0).required()
                    }),
                }
            }
        });
    };

    getAll = async (request, h) => {
        return this.service.getAll();
    };

    getById = async (request, h) => {
        return this.service.getById(request.params.id);
    };

    create = async (request, h) => {
        return this.service.create(request.payload);
    };

    update = async (request, h) => {
        return this.service.update(request.params.id, request.payload);
    };

    delete = async (request, h) => {
        return  this.service.delete(request.params.id);
    };
}

module.exports.BookController = BookController;
