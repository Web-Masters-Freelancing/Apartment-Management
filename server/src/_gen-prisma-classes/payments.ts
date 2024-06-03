import { Billable } from './billable';
import { ApiProperty } from '@nestjs/swagger';

export class Payments {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  billableId: number;

  @ApiProperty({ type: Date })
  paidOn: Date;

  @ApiProperty({ type: Number })
  advancePayment: number;

  @ApiProperty({ type: Number })
  balance: number;

  @ApiProperty({ type: Number })
  amountPaid: number;

  @ApiProperty({ type: () => Billable })
  billable: Billable;
}
