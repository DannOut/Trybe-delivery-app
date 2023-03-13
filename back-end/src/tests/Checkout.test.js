const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const createSale = require('../services/CheckOut.service');


chai.use(chaiHttp);
