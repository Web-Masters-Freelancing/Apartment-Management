import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BILLABLE_STATUS, Prisma } from '@prisma/client';
import { FindAllBillableResponseDto } from './dto/find-all.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

type BillableDueType = {
  type: 'AfterDue' | 'BeforeDue';
};

@Injectable()
export class BillableService {
  constructor(private readonly prismaService: PrismaService) {}

  async processPayment({ amount, id }: ProcessPaymentDto) {
    try {
      await this.prismaService.withTransaction(async (prisma) => {
        const data = await prisma.billable.findUnique({
          where: {
            id,
            status: BILLABLE_STATUS.ACTIVE,
          },
          select: {
            amount: true,
          },
        });

        if (!data)
          throw new NotFoundException(
            'This billable record is not found or it has been inactive.',
          );

        const newAmount = data.amount - amount;

        await Promise.all([
          prisma.billable.update({
            where: {
              id,
            },
            data: {
              amount: newAmount,
            },
          }),
          prisma.payments.create({
            data: {
              amount,
              billableId: id,
            },
          }),
        ]);
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<FindAllBillableResponseDto[]> {
    try {
      const result = await this.prismaService.billable.findMany({
        where: {
          status: BILLABLE_STATUS.ACTIVE,
        },
        select: {
          id: true,
          dueDate: true,
          status: true,
          amount: true,
          payments: {
            select: {
              amount: true,
              paidOn: true,
            },
            orderBy: {
              paidOn: Prisma.SortOrder.desc,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return result.map((res) => {
        return {
          ...res,
          userName: res.user.name,
        };
      });
    } catch (e) {
      throw e;
    }
  }

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
