import { Module } from '@nestjs/common';
import { DataService } from './service/data.service';
import { DataController } from './controller/data.controller';
import { Game } from 'src/database/entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from 'src/database/entities/round.entity';
import { Team } from 'src/database/entities/team.entity';
import { Combination } from 'src/database/entities/combination.entity';
import { TeamService } from './service/team.service';
import { GameService } from './service/game.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Round, Team, Combination])
  ],
  controllers: [DataController],
  providers: [DataService, TeamService, GameService],
})
export class DataModule {}
