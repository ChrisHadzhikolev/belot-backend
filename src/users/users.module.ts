import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/database/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
