import { Billable } from './billable';
import { RoomHistory } from './room_history';
import { ROOM_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Room {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  type: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: ROOM_STATUS, enumName: 'ROOM_STATUS' })
  status: ROOM_STATUS = ROOM_STATUS.AVAILABLE;

  @ApiProperty({ isArray: true, type: () => Billable })
  billable: Billable[];

  @ApiProperty({ isArray: true, type: () => RoomHistory })
  roomhistory: RoomHistory[];
}
