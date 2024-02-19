import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AllUsersResponseDto } from './dto/fetch-users.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() payload: CreateUserDto) {
    await this.userService.create(payload);
  }

  @ApiExtraModels(AllUsersResponseDto)
  @ApiResponse({
    status: 200,
    type: AllUsersResponseDto,
    isArray: true,
  })
  @Get('/all')
  async getUsers(): Promise<AllUsersResponseDto[]> {
    return await this.userService.fetchUsers();
  }
}
