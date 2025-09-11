"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductShare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductShare.belongsTo(models.Product, { foreignKey: "product_id" });

      ProductShare.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  ProductShare.init(
    {
      product_id: DataTypes.INTEGER,
      price_in_cents: DataTypes.INTEGER,
      is_available: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "ProductShare",
    }
  );
  return ProductShare;
};
