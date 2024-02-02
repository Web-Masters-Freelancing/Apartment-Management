import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BILLABLE_STATUS } from '@prisma/client';

type BillableDueType = {
  type: 'AfterDue' | 'BeforeDue';
};

@Injectable()
export class BillableService {
  constructor(private readonly prismaService: PrismaService) {}

  async findDue({ type }: BillableDueType) {
    const currentDate = new Date();

    const dateReference = new Date(currentDate);

    if (type === 'AfterDue') {
      dateReference.setDate(currentDate.getDate() + 3); // 3 days before due date
    } else {
      dateReference.setDate(currentDate.getDate() - 1); // 1 day after due date
    }

    dateReference.setUTCHours(0, 0, 0, 0);

    const result = await this.prismaService.billable.findMany({
      where: {
        dueDate: {
          equals: new Date(dateReference).toISOString(),
        },
        AND: {
          status: BILLABLE_STATUS.ACTIVE,
        },
      },
      select: {
        user: {
          select: {
            contact: true,
            name: true,
          },
        },
      },
    });

    return result;
  }
}
