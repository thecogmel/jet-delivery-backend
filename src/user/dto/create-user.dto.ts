import { User } from '../entities/user.entity';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  phone?: string;
}
