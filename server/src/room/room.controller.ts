import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() payload: CreateRoomDto) {
    return await this.roomService.create(payload);
  }

  @ApiExtraModels(AvailableRoomsResponseDto)
  @ApiResponse({
    status: 200,
    type: AvailableRoomsResponseDto,
    isArray: true,
  })
  @Get('available')
  async getAvailableRooms(): Promise<AvailableRoomsResponseDto[]> {
    return await this.roomService.fetchAvailableRooms();
  }
}
