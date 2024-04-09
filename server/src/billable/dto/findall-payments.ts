import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Billable as BillableEntity } from './../../_gen-prisma-classes/billable';
import { Room as RoomEntity } from './../../_gen-prisma-classes/room';
import { Payments as PaymentsEntity } from './../../_gen-prisma-classes/payments';
import { User as UserEntity } from './../../_gen-prisma-classes/user';
import { Category as CategoryEntity } from './../../_gen-prisma-classes/category';

export class FindAllPaymentsDto extends PickType(
  IntersectionType(BillableEntity, PaymentsEntity, RoomEntity, CategoryEntity),
  ['id', 'dueDate', 'roomNumber', 'description'],
) {
  @ApiProperty({ type: String })
  @IsString()
  userName: UserEntity['name'];

  @ApiProperty({ type: String })
  @IsString()
  categoryName: CategoryEntity['name'];

  @ApiProperty({ type: Number })
  @IsNumber()
  amountToPay: RoomEntity['amount'];

  @ApiProperty({ type: Number })
  @IsNumber()
  amountPaid: PaymentsEntity['amount'];

  @ApiProperty({ type: Number })
  @IsNumber()
  balance: BillableEntity['amount'];

  @ApiProperty({ type: Number })
  @IsNumber()
  advance: BillableEntity['amount'];
}
