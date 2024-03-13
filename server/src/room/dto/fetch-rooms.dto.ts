import { PickType } from '@nestjs/swagger';
import { Room as RoomEntity } from '../../_gen-prisma-classes/room';

export class AllRoomsResponseDto extends PickType(RoomEntity, [
  'id',
  'amount',
  'status',
  'roomNumber',
  'roomNumber',
  'categoryId',
]) {}
