const {Server} = require('@hapi/hapi');
const {Auth} = require('./init/Auth');

const AppServer = class AppServer {
    server = null;

    /**
     * @param {CreateRequestContainer} createRequestContainer
     * @param {Auth} auth
     * @param {HomeController} homeController
     * @param {BookController} bookController
     * @param {AuthController} authController
     */
    constructor(createRequestContainer, auth, homeController, bookController, authController) {
        this.server = new Server({
            port: 3030,
            host: '0.0.0.0',
            routes: {
                cors: {
                    origin: ['*'],
                },
            },
        });
        this.server.auth.scheme(Auth.schemeName, auth.scheme);
        this.server.auth.strategy(Auth.strategyName, Auth.schemeName);


        // Before each request create request specific container
        this.server.ext([
            {
                type: 'onRequest',
                method: [
                    createRequestContainer.onRequest,
                ],
            }
        ]);
        homeController.setupRoutes(this.server);
        bookController.setupRoutes(this.server);
        authController.setupRoutes(this.server);
        // Global error handler
        this.server.ext('onPreResponse', (request, h) => {
            if (request.response.isBoom) {
                return  h.response({status: 'error', error: request.response.message}).code(request.response.output.statusCode || 500);
            }
            return h.continue;
        });
    }

    /**
     * @returns Promise<void>
     */
    async start() {
        await this.server.start();
        console.log('Server started on http:\\\\0.0.0.0:3030');
    }

    /**
     * @returns Promise<void>
     */
    async stop() {
        await this.server.stop();
    }

    /**
     * @param {ServerInjectOptions} options
     * @returns Promise<ServerInjectResponse>
     */
    async inject(options) {
        return this.server.inject(options);
    }
};

module.exports.AppServer = AppServer;
