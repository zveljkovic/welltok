const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');
const {Book} = require('../src/models/Book');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csvContent = fs.readFileSync(path.join(__dirname, '..', 'import.csv')).toString();
    const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    });
    const booksData = records.map((r) => ({
      id: r.Id,
      title: r.title,
      description: r.description,
      author: r.author,
      tags: r.tags.split(','),
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    const upsertPromises = booksData.map((d) => {
      return Book.upsert(d);
    });
    await Promise.all(upsertPromises);
  },

  down: async (queryInterface, Sequelize) => {
      await Book.destroy({truncate: true})
  }
};
