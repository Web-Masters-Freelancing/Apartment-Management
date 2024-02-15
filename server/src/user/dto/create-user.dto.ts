import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../_gen-prisma-classes/user';
import { Auth } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto extends PickType(User, [
  'name',
  'contact',
  'address',
  'role',
]) {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: Auth['email'];

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: Auth['password'];

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional() // Make this as optional para dili mag required if mag create ug admin user sa seeder
  roomId?: number;
}
