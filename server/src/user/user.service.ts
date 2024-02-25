import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BILLABLE_STATUS, USER_ROLE } from '@prisma/client';
import { signData } from '../lib/token';
import { FindAllUsersResponseDto } from './dto/find-all-users.dto';
import { catchError } from 'src/lib/error';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { name, email, password, address, contact, role, roomId } = payload;

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        address,
        contact,
        role,
        auth:
          role === USER_ROLE.ADMIN
            ? {
                create: {
                  token: undefined,
                  email,
                  password,
                },
              }
            : undefined,
        billable:
          role === USER_ROLE.ADMIN
            ? undefined
            : {
                create: {
                  roomId: parseInt(roomId as unknown as string),
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

    // if role is admin, return the token to instruct the user for password reset
    return role === USER_ROLE.ADMIN ? signData(createdUser) : undefined;
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
                type: true,
                roomNumber: true,
                amount: true,
              },
            },
          },
        },
      },
      where: {
        role: USER_ROLE.TENANT,
        isArchived: false,
      },
    });

    return result.map((res) => {
      const { billable, ...values } = res;
      return {
        ...values,
        roomId: billable.roomId,
        type: billable.room.type,
        roomNumber: billable.room.roomNumber,
        amount: billable.room.amount,
      };
    });
  }

  async edit(id: number, { name, contact, address, roomId }: CreateUserDto) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          name,
          contact,
          address,
          billable: { update: { data: { roomId } } },
        },
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
