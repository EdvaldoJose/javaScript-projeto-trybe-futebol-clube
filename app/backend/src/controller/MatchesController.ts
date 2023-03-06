import { Request, Response } from 'express';
import CustomError from '../utils/statusError';
import { IAddMatches, IMatches, IUpdateMatches } from '../interface/IMatches';

interface IMatchesServices {
  getAll: () => Promise<IMatches[]>;
  getAllFilted: (inProgress: boolean) => Promise<IAddMatches[]>;
  addMatch: (matchData: IAddMatches) => Promise<IAddMatches>;
  finished: (id: number) => void;
  update: (newMatches: IUpdateMatches, id: number) => void;
}

export default class MatchesController {
  declare _matchesService: IMatchesServices;

  constructor(matchesServices: IMatchesServices) {
    this._matchesService = matchesServices;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const filtedMatches = await this._matchesService
        .getAllFilted(JSON.parse(inProgress as string));
      return res.status(200).json(filtedMatches);
    }
    const matches = await this._matchesService.getAll();
    return res.status(200).json(matches);
  }

  async addMatch(req: Request, res: Response) {
    const matchData = req.body as IAddMatches;
    if (matchData.awayTeamId === matchData.homeTeamId) {
      throw new CustomError('It is not possible to create a match with two equal teams', 422);
    }
    const add = await this._matchesService.addMatch(matchData);
    return res.status(201).json(add);
  }

  async finished(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchesService.finished(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const matcheData: IUpdateMatches = req.body;
    await this._matchesService.update(matcheData, Number(id));
    return res.status(200).json({ message: 'updated' });
  }
}
