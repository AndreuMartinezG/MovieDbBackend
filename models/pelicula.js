'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelicula extends Model {

    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: 'peliculamovieId'
      });
    }
  }
  Pelicula.init({
    movieId: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    genero: DataTypes.STRING,
    sinopsis: DataTypes.STRING,
    adult: DataTypes.BOOLEAN,
    fecha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pelicula',
  });
  return Pelicula;
};