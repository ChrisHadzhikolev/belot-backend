import { IsDefined, IsString } from 'class-validator';

export class UsernameDto {
  @IsDefined()
  @IsString()
  username: string;
}
