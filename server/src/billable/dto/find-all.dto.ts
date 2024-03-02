import { ApiProperty, PickType } from '@nestjs/swagger';
import { Billable } from './../../_gen-prisma-classes/billable';
import { Room } from './../../_gen-prisma-classes/room';
import { User } from './../../_gen-prisma-classes/user';
import { IsNumber, IsString } from 'class-validator';

export class FindAllBillableResponseDto extends PickType(Billable, [
  'dueDate',
  'status',
  'id',
]) {
  @ApiProperty({
    type: String,
  })
  @IsString()
  userName: User['name'];

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  amount: Room['amount'];
}
