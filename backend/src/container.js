const inversify = require("inversify");

const {CreateRequestContainer} = require('./init/CreateRequestContainer');
const {Auth} = require('./init/Auth');
const {AppServer} = require('./AppServer');
const {HomeController} = require('./controllers/HomeController');
const {BookController} = require('./controllers/BookController');
const {AuthController} = require('./controllers/AuthController');
const {HomeService} = require('./services/HomeService');
const {BookService} = require('./services/BookService');
const {AuthService} = require('./services/AuthService');

inversify.decorate(inversify.injectable(), AppServer);
inversify.decorate(inversify.injectable(), CreateRequestContainer);
inversify.decorate(inversify.injectable(), Auth);
inversify.decorate(inversify.injectable(), HomeController);
inversify.decorate(inversify.injectable(), BookController);
inversify.decorate(inversify.injectable(), AuthController);
inversify.decorate(inversify.injectable(), HomeService);
inversify.decorate(inversify.injectable(), BookService);
inversify.decorate(inversify.injectable(), AuthService);
inversify.decorate(inversify.inject(CreateRequestContainer), AppServer, 0);
inversify.decorate(inversify.inject(Auth), AppServer, 1);
inversify.decorate(inversify.inject(HomeController), AppServer, 2);
inversify.decorate(inversify.inject(BookController), AppServer, 3);
inversify.decorate(inversify.inject(AuthController), AppServer, 4);
inversify.decorate(inversify.inject(HomeService), HomeController, 0);
inversify.decorate(inversify.inject(BookService), BookController, 0);
inversify.decorate(inversify.inject(AuthService), AuthController, 0);

// Declare bindings
const container = new inversify.Container();
container.bind(AppServer).toSelf();
container.bind(CreateRequestContainer).toSelf();
container.bind(Auth).toSelf();
container.bind(HomeController).toSelf();
container.bind(HomeService).toSelf();
container.bind(AuthController).toSelf();
container.bind(AuthService).toSelf();
container.bind(BookController).toSelf();
container.bind(BookService).toSelf();

module.exports.container = container;
