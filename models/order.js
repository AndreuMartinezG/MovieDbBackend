'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pelicula, {
        foreignKey: 'peliculaId'
      })
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId'
      })
    }
  }
  Order.init({
    precio: DataTypes.INTEGER,
    peliculaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fechaEntrega: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};