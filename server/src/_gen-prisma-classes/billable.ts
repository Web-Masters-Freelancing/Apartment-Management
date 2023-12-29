import { User } from './user';
import { Room } from './room';
import { Payments } from './payments';
import { BillableStatusEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Billable {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: () => Room })
  room: Room;

  @ApiProperty({ type: Number })
  roomId: number;

  @ApiProperty({ type: Date })
  dueDate: Date;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ enum: BillableStatusEnum, enumName: 'BillableStatusEnum' })
  status: BillableStatusEnum = BillableStatusEnum.ACTIVE;

  @ApiProperty({ isArray: true, type: () => Payments })
  Payments: Payments[];
}
