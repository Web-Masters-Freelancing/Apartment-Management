import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BILLABLE_STATUS, Prisma } from '@prisma/client';
import { FindAllBillableResponseDto } from './dto/find-all.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { FindAllPaymentsDto } from './dto/findall-payments';
import { sendNotification } from 'src/cronjob/cronjob.service';

type BillableDueType = {
  type: 'AfterDue' | 'BeforeDue';
};

export interface CreateBill {
  billableId: number;
  amountDue: number;
  advancePayment: number;
  balance: number;
  amountPaid: number;
}

@Injectable()
export class BillableService {
  constructor(private readonly prismaService: PrismaService) {}

  async processPayment({
    advancePayment,
    balance,
    amount,
    id,
  }: ProcessPaymentDto) {
    try {
      await this.prismaService.withTransaction(async (prisma) => {
        const data = await prisma.billable.findUnique({
          where: {
            id,
            status: BILLABLE_STATUS.ACTIVE,
          },
          select: {
            amountDue: true,
            user: { select: { contact: true, name: true } },
          },
        });

        if (!data)
          throw new NotFoundException(
            'This billable record is not found or it has been inactive.',
          );

        await Promise.all([
          prisma.billable.update({
            where: {
              id,
            },
            data: {
              amountDue: balance,
            },
          }),
          prisma.payments.create({
            data: {
              amountPaid: amount,
              advancePayment,
              balance,
              billableId: id,
            },
          }),
        ]);

        /**
         * After the transactions sets!
         * Send a message to the tenant via sms
         */
        const { amountDue: _, ...notifPayload } = data;
        await sendNotification({
          data: [{ ...notifPayload }],
          type: 'payment',
        });
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
          amountDue: true,
          room: {
            select: {
              amount: true,
            },
          },
          payments: {
            select: {
              amountPaid: true,
              paidOn: true,
              balance: true,
              advancePayment: true,
            },
            orderBy: {
              paidOn: Prisma.SortOrder.asc,
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
        const { user, room, ...data } = res;
        let advancePayment = 0;
        const clonePayments = structuredClone(data.payments);

        if (clonePayments && clonePayments.length) {
          // Sort payments into descending order to get the last object of payments
          const [recentPayments] = clonePayments.sort((a, b) =>
            a.paidOn > b.paidOn ? -1 : 1,
          );

          advancePayment = recentPayments.advancePayment;
          // data.amountDue = recentPayments.balance;
        } else {
          data.amountDue = room.amount;
        }
        return {
          ...data,
          roomPrice: room.amount,
          userName: user.name,
          advancePayment,
        };
      });
    } catch (e) {
      throw e;
    }
  }

  async findDueByDate(dueDate: Date) {
    const result = await this.prismaService.billable.findMany({
      where: {
        dueDate: {
          equals: new Date(dueDate).toISOString(),
        },
        AND: {
          status: BILLABLE_STATUS.ACTIVE,
        },
      },
      select: {
        id: true,
        user: {
          select: {
            contact: true,
            name: true,
          },
        },

        payments: {
          select: { advancePayment: true, balance: true, paidOn: true },
        },
        room: { select: { amount: true } },
      },
    });

    return result;
  }

  async createBill(bills: CreateBill[]) {
    try {
      await this.prismaService.withTransaction(async (prisma) => {
        await Promise.all(
          bills.map(async (value) => {
            const { amountDue, ...data } = value;

            await prisma.billable.update({
              where: { id: data.billableId },
              data: { amountDue },
            });

            await prisma.payments.create({
              data,
            });
          }),
        );
      });
    } catch (err) {
      throw err;
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

    const result = await this.findDueByDate(dateReference);

    return result;
  }

  async findAllPayments(): Promise<FindAllPaymentsDto[]> {
    const result = await this.prismaService.billable.findMany({
      select: {
        id: true,
        dueDate: true,
        amountDue: true,
        user: { select: { name: true, contact: true, address: true } },
        room: {
          select: {
            category: { select: { name: true, description: true } },
            roomNumber: true,
            amount: true,
          },
        },
        payments: {
          select: {
            paidOn: true,
            advancePayment: true,
            balance: true,
            amountPaid: true,
          },
        },
      },
    });

    return result.map((value) => {
      const { id, dueDate, user, amountDue, room, payments } = value;
      return {
        id,
        userName: user.name,
        contact: user.contact,
        address: user.address,
        categoryName: room.category.name,
        description: room.category.description,
        roomNumber: room.roomNumber,
        dueDate,
        amountDue,
        payments,
      } as FindAllPaymentsDto;
    });
  }
}
