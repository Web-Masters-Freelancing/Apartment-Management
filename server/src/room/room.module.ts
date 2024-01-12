import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoomController } from './room.controller';

@Module({
  providers: [RoomService, PrismaService],
  exports: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
