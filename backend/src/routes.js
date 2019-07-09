const {HomeController} = require('./controllers/HomeController');

function setupRoutes(server) {
    const homeController = new HomeController();
    server.route({
        path: '/',
        method: 'GET',
        handler: homeController.home
    });
}

module.exports.setupRoutes = setupRoutes;
