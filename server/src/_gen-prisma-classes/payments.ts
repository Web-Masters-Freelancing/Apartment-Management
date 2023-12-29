import { Billable } from './billable';
import { ApiProperty } from '@nestjs/swagger';

export class Payments {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: () => Billable })
  billable: Billable;

  @ApiProperty({ type: Number })
  billableId: number;

  @ApiProperty({ type: Date })
  paidOn: Date;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: String })
  attachment: string;

  @ApiProperty({ type: String })
  monthsCovered: string;
}
