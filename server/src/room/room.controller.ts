import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { AllRoomsResponseDto } from './dto/fetch-rooms.dto';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() payload: CreateRoomDto) {
    await this.roomService.create(payload);
  }

  @Put('edit/:id')
  async edit(@Param('id') id: number, @Body() payload: CreateRoomDto) {
    return await this.roomService.edit(id, { ...payload });
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

  @ApiExtraModels(AllRoomsResponseDto)
  @ApiResponse({
    status: 200,
    type: AllRoomsResponseDto,
    isArray: true,
  })
  @Get(
    '/all',
  ) /** <-- We can create a separate GET /api/rooms endpoint for this, but we'll just do it this way instead */
  async getRooms(): Promise<AllRoomsResponseDto[]> {
    return await this.roomService.fetchRooms();
  }

  @Delete('/:id')
  async deleteRoom(@Param('id') id: number) {
    await this.roomService.deleteRoom(id);
  }
}
