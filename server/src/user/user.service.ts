import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // For temporary testing since seeder is not created yet
  data = [
    {
      email: 'test@gmail.com',
      password: 'test',
      name: 'Dexter Louie',
    },
    {
      email: 'test1@gmail.com',
      password: 'test1',
      name: 'Alejandro Oletres',
    },
  ];

  async findOne({ email }: { email: string }) {
    // TODO: Remove this once seeder is merged to master. This is temporary implementation since we do not have seeder yet
    const user = this.data.find((d) => d.email === email);

    // TODO: Uncomment this once seeder is merged to master
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    //   select: {
    //     password: true,
    //     address: true,
    //     contact: true,
    //     email: true,
    //     name: true,
    //   },
    // });

    return user;
  }
}
