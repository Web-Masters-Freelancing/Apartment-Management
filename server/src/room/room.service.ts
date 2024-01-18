import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

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
}
