export interface ITeamHomeAway {
  teamName: string;
}

export interface IMatches {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeamHomeAway;
  teamAway?: ITeamHomeAway;
}

export interface IAddMatches {
  homeTeamId: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
  inProgress?: boolean;
}

export interface IUpdateMatches {
  awayTeamGoals: number;
  homeTeamGoals: number;
}

export type IMatchesKeys = keyof IMatches;
