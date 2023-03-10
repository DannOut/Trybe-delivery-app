const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const ErrorClass = require('../utils/ErrorClass');
const validateChange = require('../validations/validateChangeStatus');
const validateStatus = require('../middlewares/validateStatus');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testando validateChangeStatus', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {};
    next = sinon.spy();
  });

  it('01- Lança um erro se um usuário não autorizado tentar mudar o status', () => {
    const role = 'customer';
    const status = 'Em Trânsito';
    const req = { body: { role, status } };
    const res = {};
    const next = sinon.spy();

    expect(() => validateChange(role, status)).to.throw(ErrorClass, 'unauthorized customer change');
  });

  it('02- Lança um erro se outro vendedor tentar alterar o status', () => {
    const role = 'seller';
    const status = 'Entregue';
    const req = { body: { role, status } };
    const res = {};
    const next = sinon.spy();

    expect(() => validateChange(role, status)).to.throw(ErrorClass, 'unauthorized seller change');
  });
 
  it('03- Gera um erro se o campo de status estiver ausente', () => {
    expect(() => validateStatus(req, res, next)).to.throw(ErrorClass, 'missing status field');
  });

  it('Gera um erro se o valor do status for inválido', () => {
    req.body.status = 'Invalid Status';
    expect(() => validateStatus(req, res, next)).to.throw(ErrorClass, 'invalid status value');
  });
    
  afterEach(() => {
    sinon.restore()
  });
});

