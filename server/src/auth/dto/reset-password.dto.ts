import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
