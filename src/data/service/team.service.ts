import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from '../dto/create-datum.dto';
import { UpdateDatumDto } from '../dto/update-datum.dto';
import { Team } from 'src/database/entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
){}
  async createTeam(team: any) {
    return await this.teamRepository.save(team);
  }

  async findAll() {
    return await this.teamRepository.find({relations: ['players']});
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
