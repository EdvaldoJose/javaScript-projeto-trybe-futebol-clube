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

describe('Testando rota de matches', () => {
  it('Retornar todos os matches e o status "200"', async () => {
    const httpResponse = await chai.request(app).get('/matches');

    expect(httpResponse.status).to.be.equal(200);
  });

  it('Retornar um matches filtrado com o status "200"', async () => {
    const httpResponse = await chai.request(app).get('/matches/?inProgress=true');

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body[0]).to.deep.equal({
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
    })
  })
});