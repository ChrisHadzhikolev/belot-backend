import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { DataService } from '../service/data.service';
import { CreateDatumDto } from '../dto/create-datum.dto';
import { UpdateDatumDto } from '../dto/update-datum.dto';
import { Team } from 'src/database/entities/team.entity';
import { TeamService } from '../service/team.service';
import { GameService } from '../service/game.service';
import { Game } from 'src/database/entities/game.entity';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { HttpResponseInterceptor } from 'src/interceptors/http-response.interceptor';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@UseFilters(new HttpExceptionFilter())
@UseInterceptors(HttpResponseInterceptor)
@UseInterceptors(LoggingInterceptor)
@Controller('data')
export class DataController {
  constructor(
    private readonly dataService: DataService,
    private teamService: TeamService,
    private gameService: GameService
    ) {}

    @Get('team/all')
  async findAllTeams() {
    return await this.teamService.findAll();
  }

  @Get('game/all')
  async findAllGames() {
    return await this.gameService.findAll();
  }

  @Post('game')
  createGame(@Body() game: any) {
    return this.gameService.createGame(game.game);
  }

  @Post('team')
  async createTeam(@Body() team: any) {
    console.log(team);
    return await this.teamService.createTeam(team.team);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatumDto: UpdateDatumDto) {
    return this.dataService.update(+id, updateDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
