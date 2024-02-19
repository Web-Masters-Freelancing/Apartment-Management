import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersResponseDto } from './dto/fetch-users.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() payload: CreateUserDto) {
    await this.userService.create(payload);
  }

  @ApiExtraModels(FindAllUsersResponseDto)
  @ApiResponse({
    status: 200,
    type: FindAllUsersResponseDto,
    isArray: true,
  })
  @Get('/')
  async findAll(): Promise<FindAllUsersResponseDto[]> {
    return await this.userService.findAll();
  }
}
