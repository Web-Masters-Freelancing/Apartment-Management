import { PickType } from '@nestjs/swagger';
import { User } from '../../_gen-prisma-classes/user';

export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
  'contact',
  'address',
  'role',
]) {}
