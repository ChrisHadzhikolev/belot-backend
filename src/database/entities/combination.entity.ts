// combination.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Player } from './player.entity';
import { Game } from './game.entity';
import { Round } from './round.entity';

@Entity()
export class Combination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  combination: string;

  @ManyToOne(() => Player, player => player.combinations)
  player: Player;

  @ManyToOne(() => Game, game => game.combinations)
  game: Game;

  @ManyToOne(() => Round, round => round.combinations)
  round: Round;

  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
}
