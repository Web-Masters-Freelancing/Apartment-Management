import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_ROLE } from '@prisma/client';
import { signData } from '../lib/token';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { name, email, password, address, contact, role } = payload;

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
}
