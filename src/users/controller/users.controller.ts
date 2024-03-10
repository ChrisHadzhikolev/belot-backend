import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SecretDto } from '../dto/secret.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { HttpResponseInterceptor } from 'src/interceptors/http-response.interceptor';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AllowAny } from 'src/auth/decorators/allow-any.decorator';
import { AuthService } from 'src/auth/service/auth.service';
import { UsernameDto } from '../dto/username.dto';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(HttpResponseInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
    ) {}

  @AllowAny()
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @AllowAny()
  @Post('signin')
  async login(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.login(createUserDto);
    return res;
  }

  @AllowAny()
  @Post('secret')
  checkSecret(@Body() secretDto: SecretDto) {
    return process.env.SECRETCODE === secretDto.secretCode;
  }

  @AllowAny()
  @Post('username')
  async checkUsername(@Body() usernameDto: UsernameDto) {
    if (await this.usersService.usernameCheck(usernameDto.username)) {
      return true;
    } else {
      return false;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
