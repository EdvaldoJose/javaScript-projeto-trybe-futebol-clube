import { Response, Request } from 'express';
import { ITeamsStatistics } from '../interface/ILeaderBoard';
import { IMatchesKeys } from '../interface/IMatches';

interface ILeaderBoard {
  allStatistic: (type: IMatchesKeys) => Promise<ITeamsStatistics[]>
}

export default class LeaderBoardController {
  declare _leaderBoardService: ILeaderBoard;
  constructor(leaderBoardService: ILeaderBoard) {
    this._leaderBoardService = leaderBoardService;
  }

  async getHomeStatistic(req: Request, res: Response) {
    const get = await this._leaderBoardService.allStatistic('homeTeamId');
    return res.status(200).json(get);
  }

  async getAwyStatistic(req: Request, res: Response) {
    const get = await this._leaderBoardService.allStatistic('awayTeamId');
    return res.status(200).json(get);
  }
}
