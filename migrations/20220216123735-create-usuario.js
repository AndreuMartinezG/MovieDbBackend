'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
      },
      apellido: {
        type: Sequelize.STRING,
      },
      edad: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
      },
      dni: {
        type: Sequelize.STRING,
      },
      rol: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      password: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      numCuenta: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      tokenEXP: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};