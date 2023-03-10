const { expect } = require('chai');
const { User } = require('../database/models');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const register = require('../services/Register.service');

const newUser = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '$#zebirita#$'
};

chai.use(chaiHttp);

describe('Testando register', () => {
  it('01- Deve lançar um erro se o usuário já existe', async () => {
    sinon.stub(User, 'findOne').resolves({ id: 1 });
    try {
      await register(newUser);
    } catch (error) {
      expect(error.statusCode).to.equal(409);
      expect(error.message).to.equal('User already exists');
    }
  });

  afterEach(() => {
    sinon.restore();
  });
});
