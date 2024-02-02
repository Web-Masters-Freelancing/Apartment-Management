import { room } from './room';
import { user } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class roomhistory {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  roomId: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  occupiedOn: Date;

  @ApiProperty({ type: () => room })
  room: room;

  @ApiProperty({ type: () => user })
  user: user;
}
