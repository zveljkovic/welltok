require('reflect-metadata');
const {container} = require('./container');
const {AppServer} = require('./AppServer');

const appServer = container.get(AppServer);
appServer.start();

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err);
    process.exit(1);
});
