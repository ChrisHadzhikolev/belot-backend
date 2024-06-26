// player.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { Combination } from './combination.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column({default: 'user'})
  role: string;

  @Column({select: false})
  password: string;

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
