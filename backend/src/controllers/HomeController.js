class HomeController {
    /**
     * @param {HomeService} service
     */
    constructor(service) {
        this.service = service;
    }

    setupRoutes = (server) => {
        server.route({
            path: '/',
            method: 'GET',
            handler: this.home
        });
    };

    home = async (request, h) => {
        return this.service.home();
    }
}

module.exports.HomeController = HomeController;
