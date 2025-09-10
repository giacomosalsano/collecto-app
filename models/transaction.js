'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price_per_share_in_cents: DataTypes.INTEGER,
    total_price_in_cents: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};