"use strict";

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "sales_products",
      [
        {
          sale_id: 1,
          product_id: 2,
          quantity: 3,
        },
        {
          sale_id: 1,
          product_id: 6,
          quantity: 5,
        },
        {
          sale_id: 1,
          product_id: 9,
          quantity: 2,
        },
      ],
      { timestamps: false }
    );
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("sales_products", null, {});
  },
};

