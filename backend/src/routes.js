const {HomeController} = require('./controllers/HomeController');
const {BookController} = require('./controllers/BookController');

function setupRoutes(server) {
    const homeController = new HomeController();
    server.route({
        path: '/',
        method: 'GET',
        handler: homeController.home
    });

    const bookController = new BookController();
    bookController.setupRoutes(server);
}

module.exports.setupRoutes = setupRoutes;
