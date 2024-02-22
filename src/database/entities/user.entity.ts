import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Game } from './game.entity';
import { Combination } from './combination.entity';
import { Team } from './team.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Team, team => team.players)
  @JoinTable()
  teams: Team[];

  @OneToMany(() => Combination, combination => combination.player)
  @JoinTable()
  combinations: Combination[];

@CreateDateColumn()
createdAt?: Date;

@UpdateDateColumn()
updatedAt?: Date;
}
