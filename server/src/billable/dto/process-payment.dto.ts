import { ApiProperty, PickType } from '@nestjs/swagger';
import { Billable as BillableEntity } from './../../_gen-prisma-classes/billable';
import { IsNumber } from 'class-validator';

export class ProcessPaymentDto extends PickType(BillableEntity, ['id']) {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  amount: number;
}
