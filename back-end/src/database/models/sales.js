'use strict';
import User from './user'

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sales.init({
    user_id: DataTypes.NUMBER,
    seller_id: DataTypes.NUMBER,
    total_price: DataTypes.DECIMAL,
    delivery_adress: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sales',
    tableName: "sales",
    underscored: true,
    timestamps: false,
  });

  Sales.belongsTo(User, { foreignKey: 'userId', as: 'userId' });
  Sales.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

  return Sales;
};