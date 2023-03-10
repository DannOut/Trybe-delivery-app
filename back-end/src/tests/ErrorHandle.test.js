const { expect } = require('chai');
const sinon = require('sinon');
const { JsonWebTokenError } = require('jsonwebtoken');
const ErrorClass = require('../utils/ErrorClass');
const errorHandler = require('../middlewares/ErrorHandler');

describe('Testando errorHandler', () => {
  let res;

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  it('01- Retorna a mensagem de erro e o código de status para um ErrorClass', () => {
    const error = new ErrorClass(400, 'Bad Request');

    errorHandler(error, null, res, null);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'Bad Request' })).to.be.true;
  });

  it('02- Retorna um código de status 401 e uma mensagem de erro para um JsonWebTokenError', () => {
    const error = new JsonWebTokenError('Token must be a valid token');

    errorHandler(error, null, res, null);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
  });

  it('03- Retorna um código de status 500 e uma mensagem de erro para qualquer outro erro', () => {
    const error = new Error('Internal Server Error');

    errorHandler(error, null, res, null);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'Internal Server Error' })).to.be.true;
  });
});
