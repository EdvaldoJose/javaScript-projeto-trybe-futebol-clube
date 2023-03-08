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

describe('Testando as rotas de learderboard', () => {
  it('Retorna todas as estatisticas dos times da casa e o status "200"', async () => {
      const httpResponse = await chai.request(app).get('/learderboard/home');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body[0]).to.be.equal({
        // name: "Santos",
        // totalPoints: 11,
        // totalGames: 5,
        // totalVictories: 3,
        // totalDraws: 2,
        // totalLosses: 0,
        // goalsFavor: 12,
        // goalsOwn: 6,
        // goalsBalance: 6,
        // efficiency: 73.33
    name: "Santos",
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 3,
    goalsBalance: 6,
    efficiency: 100.00
    },
    )
  });

  it('Retorna todas as estatisticas dos times de visitantes e o status "200"', async () => {
    const httpResponse = await chai.request(app).get('/learderboard/away');

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body[0]).to.be.equal({
      name: "Palmeiras",
      totalPoints: 13,
      totalGames: 5,
      totalVictories: 4,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 17,
      goalsOwn: 5,
      goalsBalance: 12,
      efficiency: 86.67
    })
  })

  });
