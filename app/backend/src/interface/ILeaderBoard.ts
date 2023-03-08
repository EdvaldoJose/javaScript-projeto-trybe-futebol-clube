export interface IGoalsStatistic {
  goals: number;
  victories: number;
  goalsOwn: number;
  totalLosses: number;
  totalDraws: number;
}

export interface IGoalsPoints {
  totalPoints: number;
  goalsBalance: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface ITeamsStatistics extends IGoalsPoints {
  name: string;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
}
