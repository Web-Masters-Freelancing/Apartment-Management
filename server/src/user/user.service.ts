import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  BILLABLE_STATUS,
  Prisma,
  ROOM_STATUS,
  USER_ROLE,
} from '@prisma/client';
import { signData } from '../lib/token';
import { FindAllUsersResponseDto } from './dto/find-all-users.dto';
import { catchError } from 'src/lib/error';
import { hashPassword } from 'src/lib/password';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { name, email, password, address, contact, role, roomId } = payload;

    const hashPassWord =
      role === 'ADMIN' ? password : await hashPassword(password);

    const roomDetails = roomId
      ? await this.prisma.room.findFirst({
          where: {
            AND: [{ id: roomId }, { status: ROOM_STATUS.AVAILABLE }],
          },
          select: {
            amount: true,
          },
        })
      : undefined;

    const amountToPay = roomDetails && roomDetails.amount;

    const currentDate = new Date();

    currentDate.setUTCHours(0, 0, 0, 0);

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        address,
        contact,
        role,
        auth: {
          create: {
            token: undefined,
            email,
            password: hashPassWord,
          },
        },
        billable:
          role === USER_ROLE.ADMIN
            ? undefined
            : {
                create: {
                  roomId,
                  amountDue: +amountToPay,
                  dueDate: currentDate.toISOString(),
                },
              },
      },
      select: {
        id: true,
        auth: {
          select: {
            email: true,
          },
        },
      },
    });

    await this.prisma.room.update({
      where: { id: roomId },
      data: { status: ROOM_STATUS.OCCUPIED },
    });

    // if role is admin, return the token to instruct the user for password reset
    // return role === USER_ROLE.ADMIN ? signData(createdUser) : undefined;

    return signData(createdUser);
  }

  async findOne({ email }: { email: string }) {
    const user = await this.prisma.auth.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        email: true,
        user: {
          select: {
            address: true,
            contact: true,
            name: true,
            role: true,
            id: true,
            billable: {
              select: {
                amountDue: true,
                dueDate: true,
                payments: {
                  select: {
                    paidOn: true,
                    advancePayment: true,
                    balance: true,
                    amountPaid: true,
                  },
                  orderBy: { paidOn: Prisma.SortOrder.asc },
                },
                room: { select: { roomNumber: true, amount: true } },
              },
            },
          },
        },
      },
    });

    return user;
  }

  async findAll(): Promise<FindAllUsersResponseDto[]> {
    const result = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        contact: true,
        address: true,
        role: true,

        billable: {
          select: {
            roomId: true,
            room: {
              select: {
                roomNumber: true,
                amount: true,
                categoryId: true,
              },
            },
          },
        },
        auth: { select: { email: true } },
      },
      where: {
        role: USER_ROLE.TENANT,
        isArchived: false,
      },
    });

    return result.map((res) => {
      const { billable, auth, ...values } = res;
      return {
        ...values,
        roomId: billable.roomId,
        roomNumber: billable.room.roomNumber,
        amount: billable.room.amount,
        categoryId: billable.room.categoryId,
        email: auth?.email ?? '',
      };
    });
  }

  async edit(
    id: number,
    { name, contact, address, roomId, email }: CreateUserDto,
  ) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          name,
          contact,
          address,
          billable: { update: { data: { roomId } } },
          auth: { update: { data: { email } } },
        },
      });

      await this.prisma.room.update({
        where: { id: roomId },
        data: { status: ROOM_STATUS.OCCUPIED },
      });
    } catch (e) {
      catchError(e);
    }
  }

  async remove(id: number) {
    const result = await this.prisma.user.updateMany({
      where: {
        AND: [
          { id },
          {
            OR: [
              { billable: { is: null } },
              { billable: { status: BILLABLE_STATUS.INACTIVE } },
            ],
          },
        ],
      },
      data: {
        isArchived: true,
      },
    });
    if (result.count === 0) {
      throw new BadRequestException(
        'Unable to remove this user as it has an existing billable record.',
      );
    }
  }
}
