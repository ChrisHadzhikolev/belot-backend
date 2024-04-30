import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from '../dto/create-datum.dto';
import { UpdateDatumDto } from '../dto/update-datum.dto';
import { Game } from 'src/database/entities/game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameService {
    constructor(@InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
){}
  async createGame(game: Game) {
    return await this.gameRepository.save(game);
  }

  async findAll() {
    return await this.gameRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} datum`;
  }

  update(id: number, updateDatumDto: UpdateDatumDto) {
    return `This action updates a #${id} datum`;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }
}
