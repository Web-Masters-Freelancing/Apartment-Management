import { Room } from './room';
import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Boolean })
  isArchived: boolean;

  @ApiProperty({ isArray: true, type: () => Room })
  Room: Room[];
}
