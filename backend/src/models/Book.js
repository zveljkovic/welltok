const Sequelize = require('sequelize');
const {SequelizeInstance} = require('../helpers/SequelizeInstance');

class Book extends Sequelize.Model {

}
Book.init({
  id: { type: Sequelize.INTEGER, primaryKey: true,  autoIncrement: true},
  title: { type: Sequelize.STRING, allowNull: false},
  description: { type: Sequelize.TEXT, allowNull: false},
  author: { type: Sequelize.STRING, allowNull: false},
  tags: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false},
}, {
  sequelize: SequelizeInstance,
  freezeTableName: true,
});

module.exports.Book = Book;
