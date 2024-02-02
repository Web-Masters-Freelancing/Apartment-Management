import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiPropertyOptional({ type: String })
  token?: string;

  @ApiProperty({ type: Date })
  lastLoggedIn: Date;

  @ApiProperty({ type: () => User })
  user: User;
}
