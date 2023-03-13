const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const sinon = require('sinon');
const { User, Sale } = require('../database/models');
const ErrorClass = require('../utils/ErrorClass');
const { getAllSales, getAllSellers, changeStatus } = require('../services/Sales.service');
const { decodeToken } = require('../auth/jwtFunctions');

chai.use(chaiHttp);

describe('Testando Sales', () => {
  it('01- Lança um erro se o usuário não for encontrado', async () => {
    const token = 'invalidToken';
    await assert.rejects(async () => {
      await getAllSales(token);
    }, ErrorClass);
  });

  it('02- Lança um erro se as vendas não forem encontradas', async () => {
    const token = 'validToken';
    const expectedUser = { id: 1, name: 'Cliente Zé Birita', email: 'zebirita@email.com' };
    const User = {
      findOne: sinon.stub().resolves(expectedUser),
    };
    const Sale = {
      findAll: sinon.stub().resolves(null),
    };
    await assert.rejects(async () => {
      await getAllSales(token, { User, Sale });
    }, ErrorClass);
  });

  it('03- Gera um erro se o usuário for um vendedor', async () => {
    const token = 'sellerToken';
    await assert.rejects(async () => {
      await getAllSellers(token);
    }, ErrorClass);
  });

  it('04- Lança um erro se o usuário não for encontrado', async () => {
    const id = 1;
    const token = 'invalidToken';
    const newStatus = 'delivered';
    const User = {
      findOne: sinon.stub().resolves(null),
    };
    await assert.rejects(async () => {
      await changeStatus(id, token, newStatus, { User });
    }, ErrorClass);
  });

  it('05- Gera um erro se o novo status for inválido', async () => {
    const id = 1;
    const token = 'validToken';
    const newStatus = 'invalidStatus';
    const user = { id: 1, role: 'seller', email: 'fulana@deliveryapp.com' };
    const User = {
      findOne: sinon.stub().resolves(user),
    };
    await assert.rejects(async () => {
      await changeStatus(id, token, newStatus, { User });
    }, ErrorClass);
  });
});
