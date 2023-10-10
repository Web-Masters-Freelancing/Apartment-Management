import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'bcrypt';
import { Prisma } from '@prisma/client';

export type LoginByUsernameAndPassword = Exclude<
  Prisma.PromiseReturnType<UserService['login']>,
  null
>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkPassword({
    plainPassword,
    hashedPassword,
  }: {
    plainPassword: string;
    hashedPassword: string;
  }) {
    return await compare(plainPassword, hashedPassword);
  }

  async login({ username, password }: { username: string; password: string }) {
    try {
      if (!password) throw new BadRequestException();

      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          password: true,
          username: true,
        },
      });

      if (!user) throw new UnauthorizedException();

      const { password: hashedPassword } = user;

      const isValid = await this.checkPassword({
        plainPassword: password,
        hashedPassword,
      });

      if (!isValid) throw new UnauthorizedException();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...data } = user;

      return data;
    } catch (e) {
      throw e;
    }
  }
}
