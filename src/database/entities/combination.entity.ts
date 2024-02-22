import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Game } from './game.entity';
import { User } from './user.entity';
import { Round } from './round.entity';

@Entity()
export class Combination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  combination: string;

  @ManyToOne(() => User, user => user.combinations)
  player: User;

  @ManyToOne(() => Game, game => game.combinations)
  game: Game;

  @ManyToOne(() => Round, round => round.combinations)
  round: Round;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
