import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Player } from 'src/database/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/service/auth.service';
import { map } from 'rxjs/operators';


@Injectable()
export class UsersService {
  async login(createUserDto: CreateUserDto) {
    const currentUser = await this.playerRepository.findOne({where: {name: createUserDto.name}, select: ['password', 'name']});
    if (!currentUser) throw new NotFoundException();
    return this.authService.comparePasswords(createUserDto.password, currentUser.password).pipe(match=>{
      if (match) {
        const token = this.authService
          .generateJWT(currentUser)
          .pipe(map((jwt: string) => jwt));
        return token;
      } else {
        throw new HttpException(
          { error: 'Passwords do not match' },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private authService: AuthService
) { }
  async usernameCheck(username: string) {
    return await this.playerRepository.findOne({where:{name: username}});
  }
  async create(createUserDto: CreateUserDto) {
    const user = createUserDto as Player;
    user.password = await this.authService.hashPassword(createUserDto.password);
    
    return await this.playerRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
