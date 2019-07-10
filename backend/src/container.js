const inversify = require("inversify");

const {CreateRequestContainer} = require('./init/CreateRequestContainer');
const {AppServer} = require('./AppServer');
const {HomeController} = require('./controllers/HomeController');
const {BookController} = require('./controllers/BookController');
const {HomeService} = require('./services/HomeService');
const {BookService} = require('./services/BookService');

inversify.decorate(inversify.injectable(), AppServer);
inversify.decorate(inversify.injectable(), CreateRequestContainer);
inversify.decorate(inversify.injectable(), HomeController);
inversify.decorate(inversify.injectable(), BookController);
inversify.decorate(inversify.injectable(), HomeService);
inversify.decorate(inversify.injectable(), BookService);
inversify.decorate(inversify.inject(CreateRequestContainer), AppServer, 0);
inversify.decorate(inversify.inject(HomeController), AppServer, 1);
inversify.decorate(inversify.inject(BookController), AppServer, 2);
inversify.decorate(inversify.inject(HomeService), HomeController, 0);
inversify.decorate(inversify.inject(BookService), BookController, 0);

// Declare bindings
const container = new inversify.Container();
container.bind(AppServer).toSelf();
container.bind(CreateRequestContainer).toSelf();
container.bind(HomeController).toSelf();
container.bind(HomeService).toSelf();
container.bind(BookController).toSelf();
container.bind(BookService).toSelf();

module.exports.container = container;
