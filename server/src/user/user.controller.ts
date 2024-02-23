import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllUsersResponseDto } from './dto/find-all-users.dto';

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

  @Put('edit/:id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateUserDto,
  ) {
    return await this.userService.edit(id, { ...payload });
  }
}
