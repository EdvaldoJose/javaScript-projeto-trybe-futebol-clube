import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando autenticacao do usuario', () => {
  describe('Com as credencias erradas', () => {
    it('Retorna um status "400" ao tentar acessar sem o campo "emil"', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        password: 'trybe_123456',
      });

      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('Retorna um status "401" ao enviar um email de usuario inexistente', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'batman@gamil.com',
        password: 'trybe_123456',
      });

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('Retorna um status "401" ao enviar uma senha de usuario invalido', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com.br',
        password: 'trybe_123456',
      });

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
    });
  });
});