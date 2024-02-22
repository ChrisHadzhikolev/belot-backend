import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Combination } from './combination.entity';
import { Round } from './round.entity';

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Round, round => round.game)
    rounds: Round[];

    @OneToMany(() => Combination, combination => combination.game)
    combinations: Combination[];
    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
