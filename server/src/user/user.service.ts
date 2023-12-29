import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleEnum } from '@prisma/client';
import { signData } from '../lib/token';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { name, email, password, address, contact, role } = payload;

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        password,
        email,
        address,
        contact,
        role,
        Auth:
          role === RoleEnum.ADMIN
            ? {
                create: {
                  token: undefined,
                },
              }
            : undefined,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // if role is admin, return the token to instruct the user for password reset
    return role === RoleEnum.ADMIN ? signData(createdUser) : undefined;
  }

  async findOne({ email }: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        address: true,
        contact: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}
