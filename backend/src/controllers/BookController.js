const {BookService} = require('../services/BookService');
const joi = require('@hapi/joi');

class BookController {
    service = null;
    constructor() {
        this.service = new BookService();
    }

    setupRoutes = (server) => {
        server.route({
            path: '/book',
            method: 'GET',
            handler: this.getAll
        });
        server.route({
            path: '/book/{id}',
            method: 'GET',
            handler: this.getById,
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
            handler: this.create,
            options: {
                validate: {
                    payload: joi.object().keys({
                        title: joi.string().required(),
                        description: joi.string().required(),
                        author: joi.string().required(),
                        tags: joi.array().items(Joi.string()).required(),
                    })
                }
            }
        });
        server.route({
            path: '/book/{id}',
            method: 'PATCH',
            handler: this.update,
            options: {
                validate: {
                    params: joi.object().keys({
                        id: joi.number().min(0).required()
                    }),
                    payload: joi.object().keys({
                        title: joi.string().required(),
                        description: joi.string().required(),
                        author: joi.string().required(),
                        tags: joi.array().items(Joi.string()).required(),
                    })
                }
            }
        });
        server.route({
            path: '/book/{id}',
            method: 'DELETE',
            handler: this.delete,
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
