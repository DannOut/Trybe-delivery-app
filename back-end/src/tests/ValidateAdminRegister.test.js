const validateAdminRegister = require('../middlewares/validateAdminRegister');
const ErrorClass = require('../utils/ErrorClass');
const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');

chai.use(chaiHttp);

describe('Testando validateAdminRegister middleware', () => {
  it('01- Gera um erro caso os campos obrigatórios estejam ausentes', () => {
    const req = { body: {} };
    const res = {};
    const next = sinon.spy();

    expect(() => validateAdminRegister(req, res, next)).to.throw(ErrorClass);
    expect(next.notCalled).to.be.true;
  });

  it('02- Gera um erro caso a senha seja inválida', () => {
    const req = { body: { email: 'zebirita@email.com', password: '$#z', name: 'Cliente Zé Birita' } };
    const res = {};
    const next = sinon.spy();

    expect(() => validateAdminRegister(req, res, next)).to.throw(ErrorClass);
    expect(next.notCalled).to.be.true;
  });

  it('03- Gera um erro se o campo de nome for inválido', () => {
    const req = { body: { email: 'zebirita@email.com', password: '$#zebirita#$', name: 'Zé' } };
    const res = {};
    const next = sinon.spy();

    expect(() => validateAdminRegister(req, res, next)).to.throw(ErrorClass);
    expect(next.notCalled).to.be.true;
  });

  it('04- Gera um erro se o e-mail for inválido', () => {
    const req = { body: { email: 'test@test', password: '$#zebirita#$', name: 'Cliente Zé Birita' } };
    const res = {};
    const next = sinon.spy();

    expect(() => validateAdminRegister(req, res, next)).to.throw(ErrorClass);
    expect(next.notCalled).to.be.true;
  });

  it('05- Segue a aplicação se todos os campos forem válidos', () => {
    const req = { body: { email: 'zebirita@email.com', password: '$#zebirita#$', name: 'Cliente Zé Birita' } };
    const res = {};
    const next = sinon.spy();

    validateAdminRegister(req, res, next);

    expect(next.calledOnce).to.be.true;
  });
});
