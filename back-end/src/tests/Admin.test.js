const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');
const adminController = require('../controllers/Admin.controller');
const { registerUser, getAllUsers } = require('../services/Admin.service');
const ErrorClass = require('../utils/ErrorClass');

chai.use(chaiHttp);

const newUser = {
  role: 'user',
  email: 'zebirita@email.com',
  name: 'Zé',
  password: '$#zebirita#$',
};

  describe('Testando Admin', () => {
    
    let sandbox;// sandbox é uma funcionalidade do Sinon
    
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

  it('01- Retorna todos os usuários, exceto administradores', async () => {
    const findAllStub = sinon.stub(User, 'findAll')
      .resolves([{ id: 1, name: 'Zé', email: 'zebirita@email.com', role: 'user' }]);

    const req = {};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    await adminController.getAllUsers(req, res, next);

    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json
      .calledOnceWith([{ id: 1, name: 'Zé', email: 'zebirita@email.com', role: 'user' }])).to.be.true;
    findAllStub.restore();
  });

  it('02- Exclui um usuário por id e retornar um código de status 204', async () => {
    const findByPkStub = sinon.stub(User, 'findByPk')
      .resolves({ id: 1, name: 'Zé', email: 'zebirita@email.com', role: 'user' });

    const destroyStub = sinon.stub(User, 'destroy').resolves();
    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    await adminController.deleteUserById(req, res, next);

    expect(res.status.calledOnceWith(204)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    findByPkStub.restore();
    destroyStub.restore();
  });

  it('03- Retorna um erro se o email já estiver em uso', async () => {

    sandbox.stub(User, 'findOne').resolves({ email: 'zebirita@email.com' });

    try {
      await registerUser(newUser);
    } catch (error) {
      expect(error).to.be.instanceOf(ErrorClass);
      expect(error.statusCode).to.equal(409);
      expect(error.message).to.equal('Email is already being used');
    }
  });

  it('04- Retorna uma lista de usuários', async () => {
    sandbox.stub(User, 'findAll')
      .resolves([{ id: 1, role: 'user', email: 'zebirita@email.com', name: 'Zé' }]);

    const result = await getAllUsers();

    expect(result).to.deep.equal([{ id: 1, role: 'user', email: 'zebirita@email.com', name: 'Zé' }]);
  });
});
