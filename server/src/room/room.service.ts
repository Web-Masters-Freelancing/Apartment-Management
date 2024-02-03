import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { ROOM_STATUS } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ amount, type, description }: CreateRoomDto) {
    await this.prisma.room.create({
      data: {
        amount: parseFloat(amount as unknown as string),
        type,
        description,
      },
    });
  }

  async fetchAvailableRooms(): Promise<AvailableRoomsResponseDto[]> {
    try {
      const result = await this.prisma.room.findMany({
        where: {
          status: ROOM_STATUS.AVAILABLE,
        },
        select: {
          id: true,
          type: true,
          amount: true,
          description: true,
        },
      });

      return result;
    } catch (e) {
      throw e;
    }
  }
}
