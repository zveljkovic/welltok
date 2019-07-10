const {Server} = require('@hapi/hapi');

const AppServer = class AppServer {
    /** @var {Server} server */
    server = null;

    constructor(homeController, bookController) {
        this.server = new Server({
            port: 3030,
            host: '0.0.0.0',
        });

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
};

module.exports.AppServer = AppServer;
