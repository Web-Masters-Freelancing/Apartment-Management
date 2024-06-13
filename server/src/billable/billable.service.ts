import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BILLABLE_STATUS, Payments, Prisma } from '@prisma/client';
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
            room: { select: { amount: true } },
            dueDate: true,
            payments: {
              select: { advancePayment: true, balance: true, amountPaid: true },
              orderBy: { paidOn: Prisma.SortOrder.desc },
              take: 1,
            },
          },
        });
        if (!data)
          throw new NotFoundException(
            'This billable record is not found or it has been inactive.',
          );

        const { amountDue: _, room, dueDate, payments, ...notifPayload } = data;

        if (amount < room.amount) {
          const amountDue = room.amount - amount;
          const nextDue = new Date(dueDate);
          nextDue.setMonth(nextDue.getMonth() + 1);
          nextDue.setUTCHours(0, 0, 0, 0);

          await Promise.all([
            prisma.payments.create({
              data: {
                amountPaid: amount,
                advancePayment: 0,
                balance: amountDue,
                billableId: id,
                paidOn: new Date(),
              },
            }),

            prisma.billable.update({
              where: { id },
              data: { dueDate: nextDue, amountDue: amountDue },
            }),
          ]);
        }

        /** Higher amount than room price */
        if (amount > room.amount) {
          const quotientResult = amount / room.amount;

          // Create Bill
          const wholeNumberResult =
            Math.floor(quotientResult); /** Omit the decimal point  */

          let count = 1;

          if (wholeNumberResult) {
            while (count <= wholeNumberResult) {
              const nextDue = new Date(dueDate);
              nextDue.setMonth(nextDue.getMonth() + count);
              nextDue.setUTCHours(0, 0, 0, 0);

              await Promise.all([
                prisma.payments.create({
                  data: {
                    amountPaid: room.amount,
                    advancePayment: 0,
                    balance: 0,
                    billableId: id,
                    paidOn: new Date(),
                  },
                }),

                prisma.billable.update({
                  where: { id },
                  data: { dueDate: nextDue, amountDue: room.amount },
                }),
              ]);

              count++;
            }
          }

          //
          const decimalNumberResult =
            quotientResult % 1; /** Calculate the decimal */

          if (decimalNumberResult) {
            /** Difference result is the advance payment for the next month */
            const amountPaidResult = decimalNumberResult * room.amount;
            const amountPaid = Math.round(amountPaidResult);
            /** Create a balance if it is lower than room amount which is the price of the room */
            const balanceResult =
              amountPaid < room.amount ? room.amount - amountPaid : 0;

            const nextDue = new Date(dueDate);
            nextDue.setMonth(count + 1);
            nextDue.setUTCHours(0, 0, 0, 0);

            await Promise.all([
              prisma.payments.create({
                data: {
                  balance: balanceResult,
                  amountPaid,
                  advancePayment: 0,
                  paidOn: new Date(),
                  billableId: id,
                },
              }),
              prisma.billable.update({
                where: { id },
                data: { dueDate: nextDue, amountDue: balanceResult },
              }),
            ]);
          }
        }

        if (amount === room.amount) {
          const nextDue = new Date(dueDate);
          nextDue.setMonth(nextDue.getMonth() + 1);
          nextDue.setUTCHours(0, 0, 0, 0);

          await Promise.all([
            prisma.payments.create({
              data: {
                amountPaid: room.amount,
                advancePayment: 0,
                balance: 0,
                billableId: id,
                paidOn: new Date(),
              },
            }),

            prisma.billable.update({
              where: { id },
              data: { dueDate: nextDue, amountDue: room.amount },
            }),
          ]);
        }

        /**
         * After the transactions sets!
         * Send a message to the tenant via sms
         */
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
          deposit: true,
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
              startDate: true,
            },
          },
        },
      });

      return result.map((res) => {
        const { user, room, ...data } = res;
        let advancePayment = 0;

        if (data.payments && data.payments.length) {
          // Sort payments into descending order to get the last object of payments
          const lastElementOfPayment = data.payments[data.payments.length - 1];

          advancePayment = lastElementOfPayment.advancePayment;
          // data.amountDue = recentPayments.balance;
        } else {
          data.amountDue = room.amount;
        }
        return {
          ...data,
          roomPrice: room.amount,
          userName: user.name,
          advancePayment,
          startDate: user.startDate,
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
              data: { ...data, paidOn: new Date().toISOString() },
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
