import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
// import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findOne({ email });

    if (!user) return null;

    // TODO: Uncomment this once seeder is merged to master. Validate user's credentials
    // const { password: hashedPassword, ...rest } = user;

    // TODO: Remove this once seeder is merged to master. const isValid = await compare(password, hashedPassword);
    const isValid = user.password === password;

    if (!isValid) return null;

    // TODO: Uncomment this once seeder is merged to master
    // return rest;

    // TODO: Remove this once seeder is merged to master
    return user;
  }

  async login(user: Exclude<User, 'password' | 'createdAt' | 'updatedAt'>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
