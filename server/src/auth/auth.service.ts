import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { verifyResetPasswordToken } from '../lib/token';
import { hashPassword } from '../lib/password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findOne({ email });

    if (!user) return null;

    const { password: hashedPassword, ...rest } = user;

    const isValid = await compare(password, hashedPassword);

    if (!isValid) return null;

    return rest;
  }

  async login(user: Exclude<User, 'password' | 'createdAt' | 'updatedAt'>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async resetPassword({
    password,
    token,
  }: {
    token: string;
    password: string;
  }) {
    /**
     * Verified token contains id and email
     * See user.service.ts file
     */
    const verifyToken = verifyResetPasswordToken(token) as unknown as {
      id: number;
    };

    if (!verifyToken) throw new ForbiddenException();

    const { id } = verifyToken;

    const hash = await hashPassword(password);

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        auth: {
          update: {
            password: hash,
          },
        },
      },
    });
  }
}
