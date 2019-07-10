const {Server} = require('@hapi/hapi');

const AppServer = class AppServer {
    server = null;

    /**
     * @param {CreateRequestContainer} createRequestContainer
     * @param {HomeController} homeController
     * @param {BookController} bookController
     */
    constructor(createRequestContainer, homeController, bookController) {
        this.server = new Server({
            port: 3030,
            host: '0.0.0.0',
            routes: {
                cors: {
                    origin: ['*'],
                },
            },
        });
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
