import { ApiProperty, PickType } from '@nestjs/swagger';
import { Room as RoomEntity } from '../../_gen-prisma-classes/room';
import { Category as CategoryEntity } from './../../_gen-prisma-classes/category';
export class AllRoomsResponseDto extends PickType(RoomEntity, [
  'id',
  'amount',
  'status',
  'roomNumber',
  'roomNumber',
  'categoryId',
]) {
  @ApiProperty({ type: String })
  name: CategoryEntity['name'];
  @ApiProperty({ type: String })
  description: CategoryEntity['description'];
}
