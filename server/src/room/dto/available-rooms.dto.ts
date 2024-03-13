import { ApiProperty, PickType } from '@nestjs/swagger';
import { Room as RoomEntity } from '../../_gen-prisma-classes/room';
import { Category as CategoryEntity } from '../../_gen-prisma-classes/category';
import { IsString } from 'class-validator';

export class AvailableRoomsResponseDto extends PickType(RoomEntity, [
  'id',
  'amount',
  'roomNumber',
  'categoryId',
]) {
  @ApiProperty({ type: String })
  @IsString()
  name: CategoryEntity['name'];

  @ApiProperty({ type: String })
  @IsString()
  description: CategoryEntity['description'];
}
