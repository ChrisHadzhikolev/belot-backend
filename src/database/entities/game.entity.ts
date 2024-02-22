// game.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from './team.entity';
import { Combination } from './combination.entity';
import { Round } from './round.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Team, team => team.gamesAsTeam1)
  team1: Team;

  @ManyToOne(() => Team, team => team.gamesAsTeam2)
  team2: Team;

  @Column({ nullable: true })
  result_team1: number;

  @Column({ nullable: true })
  result_team2: number;

  @OneToMany(() => Combination, combination => combination.game)
  combinations: Combination[];

  @OneToMany(() => Round, round => round.game)
  rounds: Round[];
}
