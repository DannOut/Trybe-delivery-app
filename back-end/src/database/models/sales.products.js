'use strict';

const Products = require('./products');
const Sales = require('./sales');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sales.products.init({
    sale_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sales_products',
    tableName: "sales_products",
    underscored: true,
    timestamps: false,
  });

  Sales_products.belongsTo(Products, { foreignKey: 'productId', as: 'productId' });
  Sales_products.belongsTo(Sales, { foreignKey: 'salesId', as: 'salesId' });

  return Sales_products;
};