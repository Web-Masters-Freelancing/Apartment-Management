import { ApiProperty, PickType } from '@nestjs/swagger';
import { Billable as BillableEntity } from './../../_gen-prisma-classes/billable';
import { IsNumber } from 'class-validator';
import { Payments as PaymentEntity } from './../../_gen-prisma-classes/payments';

export class ProcessPaymentDto extends PickType(BillableEntity, ['id']) {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  advancePayment: PaymentEntity['advancePayment'];

  @ApiProperty({ type: Number })
  @IsNumber()
  balance: PaymentEntity['balance'];
}
