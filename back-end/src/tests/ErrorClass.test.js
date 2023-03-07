const { expect } = require('chai');
const ErrorClass = require('../utils/ErrorClass');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testando ErrorClass', () => {
  describe('Constructor', () => {
    it('Cria uma instância de ErrorClass com as propriedades corretas', () => {
      const statusCode = 404;
      const message = 'Not found';
      const error = new ErrorClass(statusCode, message);

      expect(error).to.be.an.instanceof(ErrorClass);
      expect(error).to.be.an.instanceof(Error);

      expect(error.statusCode).to.equal(statusCode);
      expect(error.message).to.equal(message);
    });

    it('Chama o construtor com o argumento de mensagem', () => {
      const statusCode = 404;
      const message = 'Not found';
      const error = new ErrorClass(statusCode, message);

      expect(error).to.be.an.instanceof(Error);
      expect(error.message).to.equal(message);
    });

    it('Defini o prototype para ErrorClass', () => {
      const statusCode = 404;
      const message = 'Not found';
      const error = new ErrorClass(statusCode, message);

      expect(error).to.be.an.instanceof(ErrorClass);
      expect(Object.getPrototypeOf(error)).to.equal(ErrorClass.prototype);
    });
  });
});

