const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Product } = require('../database/models');
const { getAllProducts, getProductById } = require('../services/Products.service');

chai.use(chaiHttp);

describe('Tetando Product Service', () => {
  describe('getAllProducts', () => {
    it('01- Retorna todos os produtos.', async () => {
      const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      sinon.stub(Product, 'findAll').resolves(products);

      const result = await getAllProducts();

      expect(result).to.deep.equal(products);
    });
    afterEach(() => {
      sinon.restore()
    });
  });

  describe('getProductById', () => {
    it('02- Retorna os produtos com id especifico.', async () => {
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
  });
  afterEach(() => {
    sinon.restore()
  });
});
