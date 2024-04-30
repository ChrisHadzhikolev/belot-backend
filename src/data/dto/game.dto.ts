import { Combination } from "src/database/entities/combination.entity";
import { Round } from "src/database/entities/round.entity";
import { Team } from "src/database/entities/team.entity";

export class GameDto{
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  team1: Team;
  team2: Team;
  result_team1: number;
  result_team2: number;
  combinations: Combination[];
  rounds: Round[];
}