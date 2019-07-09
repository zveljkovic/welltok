const {Book} = require('../models/Book');

class BookService {
    async getAll() {
        return Book.findAll();
    }
    async getById(id) {
        return Book.findByPk(id);
    }
    async create(data) {
        return Book.create(data);
    }
    async update(id, data) {
        const book = await Book.findByPk(id);
        Object.assign(book, data);
        await book.save();
        return book;
    }
    async delete(id) {
        const book = await Book.findByPk(id);
        await book.destroy();
        return {status: 'success'}
    }
}

module.exports.BookService = BookService;
