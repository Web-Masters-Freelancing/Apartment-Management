import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
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

  @Get('available')
  async getAvailableRooms(): Promise<AvailableRoomsResponseDto[]> {
    return await this.roomService.fetchAvailableRooms();
  }

  @Get(
    '/all',
  ) /** <-- We can create a separate GET /api/rooms endpoint for this, but we'll just do it this way instead */
  async getRooms(
    @Query('keyword') keyword?: string,
  ): Promise<AllRoomsResponseDto[]> {
    return await this.roomService.fetchRooms(keyword);
  }

  @Delete('/:id')
  async deleteRoom(@Param('id') id: number) {
    await this.roomService.deleteRoom(id);
  }
}
