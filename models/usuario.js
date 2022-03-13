'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: 'usuarioId'
      });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    email: DataTypes.STRING,
    dni: DataTypes.STRING,
    rol: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    telefono: DataTypes.STRING,
    numCuenta: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};