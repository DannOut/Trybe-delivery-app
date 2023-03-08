"use strict";
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "sales",
      [
        {
          id: 1,
          user_id: 3,
          seller_id: 2,
          total_price: 62.73,
          delivery_address: "rua grupo 21",
          delivery_number: "123",
          sale_date: new Date("2011-08-01T19:58:00.000Z"),
          status: "Pendente",
        },
      ],
      { timestamps: false }
    );
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("sales", null, {});
  },
};
