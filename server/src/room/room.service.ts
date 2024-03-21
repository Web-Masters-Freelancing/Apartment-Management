import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { Prisma, ROOM_STATUS, BILLABLE_STATUS } from '@prisma/client';
import { AllRoomsResponseDto } from './dto/fetch-rooms.dto';
import { catchError } from '../lib/error';

const rooms = {
  id: true,
  amount: true,
  status: true,
  roomNumber: true,
  categoryId: true,
  category: { select: { name: true, description: true } },
};

const selectAvailableRooms = Prisma.validator<Prisma.RoomSelect>()(rooms);

const selectAllRooms = Prisma.validator<Prisma.RoomSelect>()({
  ...rooms,
  status: true,
});

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteRoom(id: number) {
    try {
      const isRoomOccupied = await this.prisma.billable.findFirst({
        where: {
          roomId: id,
          AND: {
            status: BILLABLE_STATUS.ACTIVE,
          },
        },
      });

      if (isRoomOccupied) {
        throw new BadRequestException(
          'Room cannot be deleted as it is currently occupied by a tenant.',
        );
      }

      await this.prisma.room.update({
        where: {
          id,
        },
        data: {
          isArchived: true,
        },
      });
    } catch (e) {
      catchError(e);
    }
  }

  async edit(id: number, { amount, roomNumber, categoryId }: CreateRoomDto) {
    try {
      await this.prisma.room.update({
        where: {
          id,
        },
        data: {
          amount: parseFloat(amount as unknown as string),
          roomNumber: parseFloat(roomNumber as unknown as string),
          categoryId,
        },
      });
    } catch (e) {
      catchError(e);
    }
  }

  async create({ amount, roomNumber, categoryId }: CreateRoomDto) {
    try {
      await this.prisma.room.create({
        data: {
          categoryId,
          amount: parseFloat(amount as unknown as string),
          roomNumber: parseFloat(roomNumber as unknown as string),
        },
      });
    } catch (e: any) {
      catchError(e);
    }
  }

  async fetchRooms(): Promise<AllRoomsResponseDto[]> {
    const result = await this.prisma.room.findMany({
      where: { isArchived: false },
      select: selectAllRooms,
      orderBy: {
        status: Prisma.SortOrder.asc,
      },
    });

    return result.map((value) => {
      const { category, ...rooms } = value;
      return {
        ...rooms,
        name: category.name,
        description: category.description,
      };
    });
  }

  async fetchAvailableRooms(): Promise<AvailableRoomsResponseDto[]> {
    try {
      const result = await this.prisma.room.findMany({
        where: {
          status: ROOM_STATUS.AVAILABLE,
          isArchived: false,
        },
        select: {
          ...selectAvailableRooms,
        },
      });

      return result.map((value) => {
        const { category, ...rooms } = value;
        return {
          ...rooms,
          name: category.name,
          description: category.description,
        };
      });
    } catch (e) {
      catchError(e);
    }
  }
}
