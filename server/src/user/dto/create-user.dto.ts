import { PickType } from '@nestjs/swagger';
import { User } from '../../_gen-prisma-classes/user';
import { Auth } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends PickType(User, [
  'name',
  'contact',
  'address',
  'role',
]) {
  @IsString()
  @IsOptional()
  email?: Auth['email'];

  @IsString()
  @IsOptional()
  password?: Auth['password'];
}
