import Teams from '../database/models/TeamsModel';
import MatchesService from './MatchesService';
import { ITeams } from '../interface/ITeams';
import { IMatches, IMatchesKeys } from '../interface/IMatches';
import { IGoalsPoints, IGoalsStatistic, ITeamsStatistics } from '../interface/ILeaderBoard';

export default class LeaderBoardService extends MatchesService {
  declare type: IMatchesKeys;
  constructor(private teamsModel = Teams) { super(); }

  async getAllMatchesPerTeam(team: ITeams) {
    const allMatches = await this.getAllFilted(false);
    const filterMatches = allMatches
      .filter((currMatche: IMatches) => currMatche[this.type] === team.id);
    return filterMatches;
  }

  private sumGoalsAndVictories = (acc: IGoalsStatistic, currMatche: IMatches) => {
    acc.goals += currMatche[this.type === 'awayTeamId' ? 'awayTeamGoals' : 'homeTeamGoals'];

    acc.goalsOwn += currMatche[this.type !== 'awayTeamId' ? 'awayTeamGoals' : 'homeTeamGoals'];

    acc.totalLosses = currMatche[this.type === 'awayTeamId' ? 'awayTeamGoals' : 'homeTeamGoals']
     < currMatche[this.type !== 'awayTeamId' ? 'awayTeamGoals' : 'homeTeamGoals']
      ? acc.totalLosses += 1 : acc.totalLosses;

    acc.victories = currMatche[this.type === 'awayTeamId' ? 'awayTeamGoals' : 'homeTeamGoals']
     > currMatche[this.type !== 'awayTeamId' ? 'awayTeamGoals' : 'homeTeamGoals']
      ? acc.victories += 1 : acc.victories;

    acc.totalDraws = currMatche.awayTeamGoals === currMatche.homeTeamGoals
      ? acc.totalDraws += 1 : acc.totalDraws;

    return acc;
  };

  async goalsAndVictories(team: ITeams):Promise<IGoalsStatistic> {
    const matches: IMatches[] = await this.getAllMatchesPerTeam(team);

    return matches.reduce(
      this.sumGoalsAndVictories,
      { victories: 0, goals: 0, goalsOwn: 0, totalLosses: 0, totalDraws: 0 },
    );
  }

  async teamStatistic(team: ITeams): Promise<ITeamsStatistics> {
    const filterMatches: IMatches[] = await this.getAllMatchesPerTeam(team);

    const {
      goals, victories, goalsOwn, totalDraws, totalLosses,
    } = await this.goalsAndVictories(team); const totalGames = filterMatches.length;

    const totalVictories = victories; const goalsFavor = goals;

    const goalsBalance = goalsFavor - goalsOwn;

    const totalPoints = totalVictories * 3 + totalDraws * 1;

    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const result = { goalsFavor, goalsOwn, goalsBalance, efficiency, totalLosses };

    return {
      name: team.teamName, totalPoints, totalGames, totalVictories, totalDraws, ...result,
    };
  }

  private sortTeams = (a:IGoalsPoints, b:IGoalsPoints) => b.totalPoints - a.totalPoints
  || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn;

  async allStatistic(type: IMatchesKeys): Promise<ITeamsStatistics[]> {
    this.type = type;

    const allTeams: ITeams[] = await this.teamsModel.findAll();

    const getResult = Promise.all(allTeams.map(async (currTeam: ITeams) => {
      const teamStatistic = await this.teamStatistic(currTeam);
      return teamStatistic;
    }));

    return (await getResult).sort(this.sortTeams);
  }
}
