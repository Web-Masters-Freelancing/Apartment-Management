import { ApiProperty, PickType } from '@nestjs/swagger';
import { Billable } from './../../_gen-prisma-classes/billable';
import { User as UserEntity } from './../../_gen-prisma-classes/user';
import { Payments as PaymentsEntity } from './../../_gen-prisma-classes/payments';
import { Room as RoomEntity } from './../../_gen-prisma-classes/room';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class FindAllPaymentsForFindAllBillableResponseDto extends PickType(
  PaymentsEntity,
  ['amountPaid', 'paidOn', 'advancePayment', 'balance'],
) {}

export class FindAllBillableResponseDto extends PickType(Billable, [
  'dueDate',
  'status',
  'id',
  'amountDue',
  'startDate',
  'deposit',
]) {
  @ApiProperty({
    type: String,
  })
  @IsString()
  userName: UserEntity['name'];

  @ApiProperty({
    type: FindAllPaymentsForFindAllBillableResponseDto,
    isArray: true,
  })
  @IsArray({ each: true })
  payments: FindAllPaymentsForFindAllBillableResponseDto[];

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  roomPrice: RoomEntity['amount'];

  @ApiProperty({ type: Number })
  @IsNumber()
  advancePayment: PaymentsEntity['advancePayment'];
}
