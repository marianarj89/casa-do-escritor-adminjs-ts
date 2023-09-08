'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('escritores', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: new Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: new Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: new Sequelize.STRING,
            allowNull: false
        },
        livros: {
            type: new Sequelize.STRING,
            allowNull: false
        },
        saqueLiberado: {
            type: new Sequelize.BOOLEAN,
            allowNull: false
        },
        topSeller: {
            type: new Sequelize.STRING,
            allowNull: false
        },
        valorVendido: {
            type: new Sequelize.FLOAT,
            allowNull: false
        },
        createdAt: {
            type: new Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        updatedAt: {
            type: new Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date()
    }});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('escritores');
  }
};