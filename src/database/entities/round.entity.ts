import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Game } from './game.entity';
import { Combination } from './combination.entity';

@Entity()
export class Round {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    roundNumber: number;

    @ManyToOne(() => Game, game => game.rounds)
    game: Game;

    @OneToMany(() => Combination, combination => combination.round)
    combinations: Combination[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
