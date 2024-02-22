// team.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Player } from './player.entity';
import { Game } from './game.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => Player, player => player.teams)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Game, game => game.team1)
  gamesAsTeam1: Game[];

  @OneToMany(() => Game, game => game.team2)
  gamesAsTeam2: Game[];
}
