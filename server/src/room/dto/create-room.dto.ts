import { PickType } from '@nestjs/swagger';
import { Room as RoomEntity } from '../../_gen-prisma-classes/room';

export class CreateRoomDto extends PickType(RoomEntity, [
  'type',
  'description',
  'amount',
  'roomNumber',
]) {}
