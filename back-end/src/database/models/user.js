"use strict";
const User = (sequelize, DataTypes) => {
  const userTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: 'users',
    modelName: 'User',
  });

  userTable.associate = (models) => {
    userTable.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'user' },
      { foreignKey: 'sellerId', as: 'seller' },
    );
  };

  return userTable;
};

module.exports = User;
