import { Auth } from './auth';
import { Billable } from './billable';
import { RoomHistory } from './room_history';
import { USER_ROLE } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  contact: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ enum: USER_ROLE, enumName: 'USER_ROLE' })
  role: USER_ROLE = USER_ROLE.TENANT;

  @ApiProperty({ type: Boolean })
  isArchived: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => Auth })
  auth?: Auth;

  @ApiPropertyOptional({ type: () => Billable })
  billable?: Billable;

  @ApiPropertyOptional({ type: () => RoomHistory })
  roomhistory?: RoomHistory;
}
