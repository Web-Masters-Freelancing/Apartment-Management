import { PickType } from '@nestjs/swagger';
import { User as UserEntity } from '../../_gen-prisma-classes/user';

export class FindAllUsersResponseDto extends PickType(UserEntity, [
  'id',
  'name',
  'contact',
  'address',
  'role',
]) {}
