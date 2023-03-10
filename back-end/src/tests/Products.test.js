const { expect } = require('chai');
const { Product } = require('../database/models');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { getAllProducts, getProductById } = require('../services/Products.service');
const validateProducts = require('../validations/validateProducts');
const ErrorClass = require('../utils/ErrorClass');

chai.use(chaiHttp);

describe('Tetando Product Service', () => {
  let req;
  let res;
  let next;
  
  beforeEach(() => {
    req = {
      body: {
        products: [
          { id: 1, price: '10.00', quantity: 2 },
          { id: 2, price: '5.50', quantity: 1 },
        ],
        totalPrice: 25.50
      }
    };
    res = {};
    next = sinon.spy();
  });

  it('01- Retorna todos os produtos', async () => {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    sinon.stub(Product, 'findAll').resolves(products);

    const result = await getAllProducts();

    expect(result).to.deep.equal(products);
  });
  afterEach(() => {
    sinon.restore()
  });

  it('02- Retorna os produtos com id especifico', async () => {
    const product = { id: 1, name: 'Product 1' };
    sinon.stub(Product, 'findByPk').resolves(product);

    const result = await getProductById(1);

    expect(result).to.deep.equal(product);
  });

  it('03- Retorna nulo caso nenhum produto for encontrado com o id especificado', async () => {
    sinon.stub(Product, 'findByPk').resolves(null);

    const result = await getProductById(8);

    expect(result).to.be.null;
  });
  
  it('04- Lança um erro caso totalPrice estiver incorreto', () => {
    req.body.totalPrice = 25.49;
    expect(() => validateProducts(req.body.products, req.body.totalPrice)).to.throw(ErrorClass);
    expect(next.calledOnce).to.be.false;
  });
  
  it('05- Lança um erro se os produtos contiverem id duplicado', () => {
    req.body.products = [
      { id: 1,
        price: '10.00', 
        quantity: 2,
      }, 
      { id: 1,
        price: '5.50',
        quantity: 1,
      },
    ];
    expect(() => validateProducts(req.body.products, req.body.totalPrice)).to.throw(ErrorClass);
    expect(next.calledOnce).to.be.false;
  });

  afterEach(() => {
    sinon.restore()
  });
});
