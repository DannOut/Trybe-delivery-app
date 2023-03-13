const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const ErrorClass = require('../utils/ErrorClass');
const validateRegister = require('../middlewares/validateRegister');

chai.use(chaiHttp);

describe('Testando validateRegister', () => {

  it('01- Lança um ErrorClass com status 404 se algum campo obrigatório estiver faltando', () => {
    const req = { body: { email: 'zebirita@email.com', password: '$#zebirita#$' } };
    const res = {};
    const next = sinon.spy();
    try {
      validateRegister(req, res, next);
    } catch (err) {
      expect(err).to.be.an.instanceOf(ErrorClass);
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('missing some required fields');
      expect(next.calledOnce).to.be.false;
    }
  });

  it('02- Lança um ErrorClass com status 404 se o comprimento da senha for menor que 6 caracteres', () => {
    const req = { body: { email: 'zebirita@email.com', password: '$#ze', name: 'Zé Birita' } };
    const res = {};
    const next = sinon.spy();
    try {
      validateRegister(req, res, next);
    } catch (err) {
      expect(err).to.be.an.instanceOf(ErrorClass);
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('invalid password');
      expect(next.calledOnce).to.be.false;
    }
  });

  it('03- Lança um ErrorClass com status 404 se o tamanho do nome for menor que 12 caracteres', () => {
    const req = { body: { email: 'zebirita@email.com', password: '$#zebirita#$', name: 'Zé' } };
    const res = {};
    const next = sinon.spy();
    try {
      validateRegister(req, res, next);
    } catch (err) {
      expect(err).to.be.an.instanceOf(ErrorClass);
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('invalid name field');
      expect(next.calledOnce).to.be.false;
    }
  });

  afterEach(() => {
    sinon.restore()
  });
});
