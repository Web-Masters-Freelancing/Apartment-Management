import { Module } from '@nestjs/common';
import { BillableService } from './billable.service';
import { PrismaService } from '../prisma/prisma.service';
import { BillableController } from './billable.controller';

@Module({
  providers: [BillableService, PrismaService],
  exports: [BillableService],
  controllers: [BillableController],
})
export class BillableModule {}
