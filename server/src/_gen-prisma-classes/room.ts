import { Billable } from './billable';
import { RoomHistory } from './room_history';
import { RoomStatusEnum } from '@prisma/client';
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

  @ApiProperty({ enum: RoomStatusEnum, enumName: 'RoomStatusEnum' })
  status: RoomStatusEnum = RoomStatusEnum.NOT_AVAILABLE;

  @ApiProperty({ isArray: true, type: () => Billable })
  Billable: Billable[];

  @ApiProperty({ isArray: true, type: () => RoomHistory })
  RoomHistory: RoomHistory[];
}
