const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const changeToNumber = require('../utils/ReplaceSaleValues');

chai.use(chaiHttp)

describe('Testando ReplaceSaleValues', () => {
  let sale;
  beforeEach(() => {
    sale = {
      totalPrice: '15,50',
      products: [
        { price: '5,50', id: '123', quantity: 2 },
        { price: '2,50', id: '456', quantity: 1 },
      ],
    };
  });

  it('01- Altera totalPrice para number e alterar todos os preços de produtos para number', () => {
    const expectedSale = {
      totalPrice: 15.50,
      products: [
        { price: 5.50, id: '123', quantity: 2, totalPrice: 15.50 },
        { price: 2.50, id: '456', quantity: 1, totalPrice: 15.50 },
      ],
    };
    const result = changeToNumber(sale, true);
    expect(result).to.deep.equal(expectedSale);
  });
});


