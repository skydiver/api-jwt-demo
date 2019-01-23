/* eslint-disable max-nested-callbacks */

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

let { User } = require('../models/User');

chai.use(chaiHttp);

describe('API authentication', () => {
  let user = {
    email: 'random@company.com',
    password: '123456'
  };

  before((done) => {
    User.deleteOne({ email: user.email }, (err) => {
      done();
    });
  });

  it('it should create new user', (done) => {
    chai.request(server)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        done();
      });
  });

  it('it should login created user and obtain JWT token', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        user.token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('it should return sample data using JWT token', (done) => {
    chai.request(server)
      .get('/sample')
      .set('Authorization', `JWT ${user.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        res.body.should.have.property('random');
        res.body.should.have.property('date');
        done();
      });
  });
});