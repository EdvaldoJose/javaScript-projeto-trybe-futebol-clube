import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp from 'chai-http';

// import chaiHttp = require('chai-http');

import { App } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const app = new App();

const { expect } = chai;

describe('Testando rotas de times', () => {
    it('Deve retornar todos os times e o status "200"', async ()=> {
      const httpResponse = await chai.request(app).post('/teams')

      expect(httpResponse.status).to.be.equal(200);
    });

    it('Deve retornar um time com o status "200"', async ()=> {
      const httpResponse = await chai.request(app).post('/teams/1');

      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal({ id: 1, teamName: 'Avaí/Kindermann' });
    });
});

