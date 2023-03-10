const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const ErrorClass = require('../utils/ErrorClass');
const validateCheckOut = require('../middlewares/validateCheckOut');

chai.use(chaiHttp);

describe('Testando validateCheckOut middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        customerEmail: 'zebirita@email.com',
        sellerId: 1,
        totalPrice: 100,
        deliveryAddress: 'rua grupo 21',
        deliveryNumber: '123',
      },
    };
    res = {};
    next = sinon.spy();
  });

  it('01- Lança um erro quando customerEmail está ausente', () => {
    req.body.customerEmail = undefined;
    expect(() => validateCheckOut(req, res, next)).to.throw(
      ErrorClass,
      'Missing customerEmail or sellerEmail'
    );
  });

  it('02- Gera um erro quando o sellerId estiver ausente', () => {
    req.body.sellerId = undefined;
    expect(() => validateCheckOut(req, res, next)).to.throw(
      ErrorClass,
      'Missing customerEmail or sellerEmail'
    );
  });

  it('03- Gera um erro quando o deliveryAddress estiver ausente', () => {
    req.body.deliveryAddress = undefined;
    expect(() => validateCheckOut(req, res, next)).to.throw(
      ErrorClass,
      'Missing deliveryAddress'
    );
  });

  it('04- Lança um erro quando deliveryNumber está ausente', () => {
    req.body.deliveryNumber = undefined;
    expect(() => validateCheckOut(req, res, next)).to.throw(
      ErrorClass,
      'Missing deliveryNumber'
    );
  });

  it('05- Lança um erro quando totalPrice está ausente', () => {
    req.body.totalPrice = undefined;
    expect(() => validateCheckOut(req, res, next)).to.throw(
      ErrorClass,
      'Missing totalPrice'
    );
  });
});
