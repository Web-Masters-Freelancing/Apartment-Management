import { ApiProperty, PickType } from '@nestjs/swagger';
import { User as UserEntity } from '../../_gen-prisma-classes/user';
import { Room as RoomEntity } from '../../_gen-prisma-classes/room';
import { Billable as BillableEntity } from '../../_gen-prisma-classes/billable';
import { IsNumber, IsString } from 'class-validator';

export class FindAllUsersResponseDto extends PickType(UserEntity, [
  'id',
  'name',
  'contact',
  'address',
  'role',
]) {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  roomId: BillableEntity['roomId'];

  @ApiProperty({
    type: String,
  })
  @IsString()
  type: RoomEntity['type'];

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  roomNumber: RoomEntity['roomNumber'];
}
