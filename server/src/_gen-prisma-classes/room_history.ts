import { Room } from './room';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class RoomHistory {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  roomId: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  occupiedOn: Date;

  @ApiProperty({ type: () => Room })
  room: Room;

  @ApiProperty({ type: () => User })
  user: User;
}
