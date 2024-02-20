import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AvailableRoomsResponseDto } from './dto/available-rooms.dto';
import { Prisma, ROOM_STATUS, BILLABLE_STATUS } from '@prisma/client';
import { AllRoomsResponseDto } from './dto/fetch-rooms.dto';
import { catchError } from '../lib/error';

const rooms = {
  id: true,
  type: true,
  amount: true,
  description: true,
  roomNumber: true,
};

const selectAvailableRooms = Prisma.validator<Prisma.RoomSelect>()(rooms);

const selectAllRooms = Prisma.validator<Prisma.RoomSelect>()({
  ...rooms,
  status: true,
});

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

<<<<<<< HEAD
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

  async edit(
    id: number,
    { amount, type, description, roomNumber }: CreateRoomDto,
  ) {
    try {
      await this.prisma.room.update({
        where: {
          id,
        },
        data: {
          amount: parseFloat(amount as unknown as string),
          description,
          type,
          roomNumber: parseFloat(roomNumber as unknown as string),
        },
      });
    } catch (e) {
      catchError(e);
    }
  }

  async create({ amount, type, description, roomNumber }: CreateRoomDto) {
    try {
      await this.prisma.room.create({
        data: {
          amount: parseFloat(amount as unknown as string),
          type,
          description,
          roomNumber: parseFloat(roomNumber as unknown as string),
        },
      });
    } catch (e: any) {
      catchError(e);
    }
=======
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
>>>>>>> 7c19cc9449b500e3c54f5abed64695a5789e1f78
  }

  async fetchRooms(): Promise<AllRoomsResponseDto[]> {
    const result = await this.prisma.room.findMany({
      where: { isArchived: false },
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
          isArchived: false,
        },
        select: selectAvailableRooms,
      });

      return result;
    } catch (e) {
      catchError(e);
    }
  }
}
