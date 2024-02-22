// player.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { Combination } from './combination.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
  
  @OneToMany(() => Combination, combination => combination.player)
  combinations: Combination[];

  @ManyToMany(() => Team, team => team.players)
  @JoinTable()
  teams: Team[];
}
