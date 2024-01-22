import { Auth } from './auth';
import { Billable } from './billable';
import { RoomHistory } from './room_history';
import { RoleEnum } from '@prisma/client';
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

  @ApiProperty({ enum: RoleEnum, enumName: 'RoleEnum' })
  role: RoleEnum = RoleEnum.TENANT;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => Auth })
  Auth?: Auth;

  @ApiPropertyOptional({ type: () => Billable })
  Billable?: Billable;

  @ApiProperty({ isArray: true, type: () => RoomHistory })
  RoomHistory: RoomHistory[];
}
