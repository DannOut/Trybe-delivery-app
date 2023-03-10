// const { User } = require("../database/models");
// const { expect } = require('chai');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const checkout = require('../services/CheckOut.service');
// const { userClient, userSeller } = require('./mock/Checkout.mock');
// const app = require('../api/app');


// chai.use(chaiHttp);

// describe("Testando checkout", () => {

//   it("Lança erro se não encontra um usuário em checkout", async () => {
//     sinon.stub(User, "findOne").resolves(checkout.validatePersons);
//     const response = await chai.request(app).post('/checkout').send(userClient);

//     expect(response.status).to.be.eq(404);
//     expect(response.body).to.be.deep.eq({message:'customer not Found'});
//   })
  
//   it("Lança erro se não encontra um vendedor em checkout", async () => {
//     sinon.stub(User, "findOne").resolves(checkout.validatePersons);
    
//     const response = await chai.request(app).post('/checkout').send(userSeller);
    
//     expect(response.status).to.be.eq(404);
//     expect(response.body).to.be.deep.eq({message:'seller not Found'});
//   });

//   it('', () => {
//   });
  
//   afterEach(() => {
//     sinon.restore()
//   });
// });
