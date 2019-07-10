const {container} = require('../../src/container');
const {Book} = require('../../src/models/Book');
const {BookService} = require('../../src/services/BookService');
const expect = require('chai')
    .use(require('chai-subset'))
    .expect;

// TODO: These test could benefit from using factories to quickly create test objects, ie. factory-girl
let n = 0;
const createBook = async () => {
    n++;
    return Book.create({
        title: `Sample Title ${n}`,
        description: `Sample Description ${n}`,
        author: `Sample Author ${n}`,
        tags: [`Sample Tag1 ${n}`, `Sample Tag2 ${n}`],
    });
};
const getBookData = async () => {
    n++;
    return {
        title: `Sample Title ${n}`,
        description: `Sample Description ${n}`,
        author: `Sample Author ${n}`,
        tags: [`Sample Tag1 ${n}`, `Sample Tag2 ${n}`],
    };
};

describe('BookService', () => {
    let created = [];
    let service;

    before(async () => {
        service = container.get(BookService);
    });

    // beforeEach(async () => {
    //     mock = sinon.mock(serviceObj);
    // });
    //
    afterEach(async () => {
        await Promise.all(created.map((book) => book.destroy()));
        created.length = 0;
    });

    describe('[getAll]', () => {
        it('retrieves all books from db', async () => {
            const books = [await createBook(), await createBook(), await createBook()];
            created.push(...books);
            const result = await service.getAll();
            expect(result).to.be.an('array').with.length(3)
        });
    });

    describe('[getById]', () => {
        it('retrieves single book from db', async () => {
            const books = [await createBook(), await createBook(), await createBook()];
            created.push(...books);
            const result = await service.getById(books[1].id);
            const plainResult = result.get({ plain: true });
            const wanted = books[1].get({ plain: true });
            expect(plainResult).to.be.an('object');
            expect(plainResult).to.deep.equal(wanted);
        });
    });

    describe('[create]', () => {
        it('creates new book in db', async () => {
            const bookData = await getBookData();
            const result = await service.create(bookData);
            created.push(result);
            const plainResult = result.get({ plain: true });

            const bookInDb = await service.getById(plainResult.id);
            expect(plainResult).to.deep.equal(bookInDb.get({plain: true}));
        });
    });

    describe('[update]', () => {
        it('creates new book in db', async () => {
            const bookData = await getBookData();
            const result = await service.create(bookData);
            created.push(result);
            const plainResult = result.get({ plain: true });

            const bookInDb = await service.getById(plainResult.id);
            expect(plainResult).to.deep.equal(bookInDb.get({plain: true}));
        });
    });

    describe('[delete]', () => {
        it('updates existing book in db', async () => {
            const book = await createBook();
            created.push(book);
            const newData = await getBookData();
            const result = await service.update(book.id, newData);

            const bookInDb = await service.getById(result.id);
            const wanted = bookInDb.get({plain: true});
            delete wanted.updatedAt;
            delete wanted.createdAt;
            delete wanted.id;

            expect(newData).to.deep.equal(wanted);
        });
    });
});
