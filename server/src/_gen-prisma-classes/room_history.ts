import { Room } from './room';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class RoomHistory {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: () => Room })
  room: Room;

  @ApiProperty({ type: Number })
  roomId: number;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  occupiedOn: Date;
}