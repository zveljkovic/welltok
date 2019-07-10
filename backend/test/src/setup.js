require('reflect-metadata');
require('mocha');
require('./chai-extensions');
const {Book} = require('../../src/models/Book');

process.nextTick(() => {
    before(async () => {
        Book.destroy({truncate: true})
    });

    after(async () => {

    });
});
