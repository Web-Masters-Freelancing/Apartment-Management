import { Room } from './room';
import { User } from './user';
import { Payments } from './payments';
import { BILLABLE_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Billable {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  roomId: number;

  @ApiProperty({ type: Date })
  dueDate: Date;

  @ApiPropertyOptional({ type: Number })
  deposit?: number;

  @ApiProperty({ type: Number })
  amountDue: number;

  @ApiProperty({ enum: BILLABLE_STATUS, enumName: 'BILLABLE_STATUS' })
  status: BILLABLE_STATUS = BILLABLE_STATUS.ACTIVE;

  @ApiProperty({ type: Date })
  startDate: Date;

  @ApiProperty({ type: () => Room })
  room: Room;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => Payments })
  payments: Payments[];
}
