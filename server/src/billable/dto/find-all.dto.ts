import { ApiProperty, PickType } from '@nestjs/swagger';
import { Billable } from './../../_gen-prisma-classes/billable';
import { User as UserEntity } from './../../_gen-prisma-classes/user';
import { Payments as PaymentsEntity } from './../../_gen-prisma-classes/payments';
import { IsArray, IsString } from 'class-validator';

class FindAllPaymentsForFindAllBillableResponseDto extends PickType(
  PaymentsEntity,
  ['amount', 'paidOn'],
) {}

export class FindAllBillableResponseDto extends PickType(Billable, [
  'dueDate',
  'status',
  'id',
  'amount',
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
}
