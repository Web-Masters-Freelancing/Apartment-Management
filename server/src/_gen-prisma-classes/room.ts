import { Billable } from './billable';
import { RoomHistory } from './room_history';
import { ROOM_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Room {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  type: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ enum: ROOM_STATUS, enumName: 'ROOM_STATUS' })
  status: ROOM_STATUS = ROOM_STATUS.AVAILABLE;

  @ApiProperty({ type: Boolean })
  isArchived: boolean;

  @ApiProperty({ type: Number })
  roomNumber: number;

  @ApiProperty({ isArray: true, type: () => Billable })
  billable: Billable[];

  @ApiProperty({ isArray: true, type: () => RoomHistory })
  roomhistory: RoomHistory[];
}
