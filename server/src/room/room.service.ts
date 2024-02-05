import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { Prisma, ROOM_STATUS } from '@prisma/client';
import { AllRoomsResponseDto } from './dto/fetch-rooms.dto';

const selectAvailableRooms = Prisma.validator<Prisma.RoomSelect>()({
  id: true,
  type: true,
  amount: true,
  description: true,
});

const selectAllRooms = Prisma.validator<Prisma.RoomSelect>()({
  id: true,
  type: true,
  amount: true,
  description: true,
  status: true,
});

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

  async fetchRooms(): Promise<AllRoomsResponseDto[]> {
    const result = await this.prisma.room.findMany({
      select: selectAllRooms,
      orderBy: {
        status: 'asc',
      },
    });

    return result;
  }

  async fetchAvailableRooms(): Promise<AvailableRoomsResponseDto[]> {
    try {
      const result = await this.prisma.room.findMany({
        where: {
          status: ROOM_STATUS.AVAILABLE,
        },
        select: selectAvailableRooms,
      });

      return result;
    } catch (e) {
      throw e;
    }
  }
}
