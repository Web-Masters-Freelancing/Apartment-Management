import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { verifyResetPasswordToken } from '../lib/token';
import { comparePassword, hashPassword } from '../lib/password';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
    const access_token = this.jwtService.sign(user, {
      secret: process.env.AUTH_TOKEN_SECRET,
      expiresIn: '1d',
    });

    return {
      access_token,
    };
  }

  async resetPassword({
    currentPassword,
    newPassword,
    token,
  }: ResetPasswordDto & {
    token: string;
  }) {
    /**
     * Verified token contain user object and email
     * See user.service.ts file
     */
    const verifiedToken = verifyResetPasswordToken(token) as {
      email: string;
      users: User;
    };

    if (!verifiedToken) throw new ForbiddenException();

    const { email } = verifiedToken;
    const { password: hashPass } = await this.prismaService.auth.findFirst({
      where: { email },
    });

    const isComparePassword = await comparePassword(currentPassword, hashPass);

    if (!isComparePassword)
      throw new BadRequestException('Current Password is incorrect!');

    const hash = await hashPassword(newPassword);

    return await this.prismaService.auth.update({
      where: { email },
      data: { password: hash },
    });
  }
}
