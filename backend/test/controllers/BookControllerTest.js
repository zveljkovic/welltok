const sinon = require('sinon');
const {container} = require('../../src/container');
const {AppServer} = require('../../src/AppServer');
const {Auth} = require('../../src/init/Auth');
const {BookService} = require('../../src/services/BookService');
const expect = require('chai').expect;

const adminAuth = {
    credentials: {
        scope: ['admin'],
    },
    strategy: Auth.strategyName,
};

describe('BookController', () => {
    const serviceObj = {
        getAll: () => '',
        getById: () => '',
        create: () => '',
        update: () => '',
        delete: () => '',
    };

    let appServer;
    let mock;

    before(async () => {
        container.snapshot();
        appServer = container.get(AppServer);
        container.rebind(BookService).toDynamicValue((context) => serviceObj);
    });

    after(async () => {
        container.restore();
    });

    beforeEach(async () => {
        mock = sinon.mock(serviceObj);
    });

    afterEach(async () => {
        mock.restore();
    });

    describe('[getAll]', () => {
        it('has route', async () => {
            expect(appServer).to.have.route('get', '/book')
        });

        it('calls service.getAll', async () => {
            mock.expects('getAll').once().callThrough();
            await appServer.inject({
                url: '/book',
            });
            mock.verify();
        });
    });

    describe('[getById]', () => {
        it('has route', async () => {
            expect(appServer).to.have.route('get', '/book/{id}')
        });

        it('calls service.getById', async () => {
            mock.expects('getById').once().withArgs(1122).callThrough();
            await appServer.inject({
                url: '/book/1122',
            });
            mock.verify();
        });
    });


    describe('[create]', () => {
        it('has route', async () => {
            expect(appServer).to.have.route('post', '/book')
        });

        it('calls service.create', async () => {
            const data = {
                title: 'Sample',
                description: 'Sample',
                author: 'Sample',
                tags: ['Sample 1', 'Sample 2']
            };
            mock.expects('create').once().withArgs(data).callThrough();
            await appServer.inject({
                url: '/book',
                method: 'post',
                payload: data,
                auth: adminAuth,
            });
            mock.verify();
        });
    });

    describe('[update]', () => {
        it('calls service.update', async () => {
            const data = {
                title: 'Sample',
                description: 'Sample',
                author: 'Sample',
                tags: ['Sample 1', 'Sample 2']
            };
            mock.expects('update').once().withArgs(1122, data).callThrough();
            await appServer.inject({
                url: '/book/1122',
                method: 'patch',
                payload: data,
                auth: adminAuth,
            });
            mock.verify();
        });
    });

    describe('[delete]', () => {
        it('calls service.delete', async () => {
            mock.expects('delete').once().withArgs(1122).callThrough();
            await appServer.inject({
                url: '/book/1122',
                method: 'delete',
                auth: adminAuth,
            });
            mock.verify();
        });
    });
});
