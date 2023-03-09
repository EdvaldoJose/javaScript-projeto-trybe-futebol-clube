import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interface/ITeams';

export default class TeamService {
  constructor(private teamModel = Teams) {}

  async getAll(): Promise<ITeams[]> {
    const allTeams: ITeams[] = await this.teamModel.findAll();

    return allTeams;
  }

  async getTeamById(id: number): Promise<ITeams> {
    const team = await this.teamModel.findByPk(id) as ITeams;

    return team;
  }
}
// req
