import { Request, Response } from 'express';
import { ITeams } from '../interface/ITeams';

interface ITeamService {
  getAll: () => Promise<ITeams[]>;
  getTeamById: (id: number) => Promise<ITeams>
}

export default class TeamController {
  declare _teamService: ITeamService;

  constructor(teamService: ITeamService) {
    this._teamService = teamService;
  }

  async getAll(req: Request, res: Response) {
    const getAll = await this._teamService.getAll();
    return res.status(200).json(getAll);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const getTeam = await this._teamService.getTeamById(Number(id));
    return res.status(200).json(getTeam);
  }
}
