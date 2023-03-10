const { User } = require("../database/models");
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const errorHandler = require('../middlewares/ErrorHandler');
const ErrorClass = require('../utils/ErrorClass');
const { JsonWebTokenError } = require('jsonwebtoken');

const tokenFunctions = require('../auth/jwtFunctions');
const {
  passwordLoginFailed,
  mockFalseLogin,
  responseLogin,
} = require("./mock/Login.mock.js");

chai.use(chaiHttp);

describe("Testando a rota Login", () => {

  it("01- Lança erro se não encontra um usuário", async () => {
    sinon.stub(User, "findOne").resolves(undefined);
    const response = await chai.request(app).post('/login').send(mockFalseLogin);

    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({message:'Email or password are invalid'});
  })

  it("02- Testa se recebe erro com senha incorreta", async () => {
    sinon.stub(User, "findOne").resolves(responseLogin);

    const response = await chai.request(app).post('/login').send(passwordLoginFailed);

    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({message:'Email or password are invalid'});
  });

  it('03- Retorna a mensagem de erro com o status 400', () => {
    const error = new ErrorClass(400, 'Some error message');
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const next = sinon.stub();

    errorHandler(error, req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'Some error message' })).to.be.true;
  });

  it('04- Retorna uma mensagem de erro 401', () => {
    const error = new JsonWebTokenError('Invalid token');
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const next = sinon.stub();

    errorHandler(error, req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
  });

  it('05- Retorna uma mensagem de erro 500', () => {
    const error = new Error('Some other error');
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const next = sinon.stub();

    errorHandler(error, req, res, next);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'Some other error' })).to.be.true;
  });

  it('06- Lança um erro caso o token não seja encontrado', () => {
    const req = { headers: {} };
    const res = {};
    const next = sinon.spy();
    expect(() => tokenFunctions.verifyToken(req, res, next)).to.throw(ErrorClass, 'Token not found');
    expect(next.called).to.be.false;
  });
  
  // it('Chama a próxima função caso o token seja válido', () => {
  //   const payload = { id: 1, name: 'Zé Birita' };
  //   const token = jwt.sign(payload, process.env.JWT_SECRET || 'test');
  //   const req = { headers: { authorization: token } };
  //   const res = {};
  //   const next = sinon.spy();
  //   tokenFunctions.verifyToken(req, res, next);
  //   expect(next.calledOnce).to.be.true;
  // });

  it('07- Gera um erro caso o token seja inválido', () => {
    const token = 'invalid-token';
    expect(() => tokenFunctions.decodeToken(token)).to.throw(ErrorClass, 'Token must be a valid token');
  });
  
  afterEach(() => {
    sinon.restore()
  });
});
