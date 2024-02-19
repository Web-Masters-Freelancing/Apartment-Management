import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { Prisma, ROOM_STATUS } from '@prisma/client';
import { AllRoomsResponseDto } from './dto/fetch-rooms.dto';

const rooms = {
  id: true,
  type: true,
  amount: true,
  description: true,
};

const selectAvailableRooms = Prisma.validator<Prisma.RoomSelect>()(rooms);

const selectAllRooms = Prisma.validator<Prisma.RoomSelect>()({
  ...rooms,
  status: true,
});

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async edit(id: number, { amount, type, description }: CreateRoomDto) {
    await this.prisma.room.update({
      where: {
        id,
      },
      data: {
        amount,
        description,
        type,
      },
    });
  }

  async create({ amount, type, description }: CreateRoomDto) {
    await this.prisma.room.create({
      data: {
        amount,
        type,
        description,
      },
    });
  }

  async fetchRooms(): Promise<AllRoomsResponseDto[]> {
    const result = await this.prisma.room.findMany({
      select: selectAllRooms,
      orderBy: {
        status: Prisma.SortOrder.asc,
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
