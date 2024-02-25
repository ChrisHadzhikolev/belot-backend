import { IsDefined, IsString } from 'class-validator';

export class SecretDto {
  @IsDefined()
  @IsString()
  secretCode: string;
}
