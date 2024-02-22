// round.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Game } from './game.entity';
import { Combination } from './combination.entity';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roundNumber: number;

  @ManyToOne(() => Game, game => game.rounds)
  game: Game;

  @Column({ nullable: true })
  result_team1: number;

  @Column({ nullable: true })
  result_team2: number;

  @OneToMany(() => Combination, combination => combination.round)
  combinations: Combination[];

  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
}
