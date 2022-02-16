'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelicula extends Model {

    static associate(models) {
      
    }
  }
  Pelicula.init({
    titulo: DataTypes.STRING,
    sinopsis: DataTypes.STRING,
    adult: DataTypes.BOOLEAN,
    imagen: DataTypes.STRING,
    fecha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pelicula',
  });
  return Pelicula;
};