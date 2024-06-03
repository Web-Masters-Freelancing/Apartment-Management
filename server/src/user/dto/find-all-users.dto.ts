import { ApiProperty, PickType } from '@nestjs/swagger';
import { User as UserEntity } from '../../_gen-prisma-classes/user';
import { Room as RoomEntity } from '../../_gen-prisma-classes/room';
import { Billable as BillableEntity } from '../../_gen-prisma-classes/billable';
import { IsNumber, IsString } from 'class-validator';
import { Auth as AuthEntity } from '../../_gen-prisma-classes/auth';

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
  categoryId: RoomEntity['categoryId'];
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  roomId: BillableEntity['roomId'];

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  roomNumber: RoomEntity['roomNumber'];

  @ApiProperty({ type: Number })
  @IsNumber()
  amount: RoomEntity['amount'];

  @ApiProperty({ type: String })
  @IsString()
  email: AuthEntity['email'];
}
