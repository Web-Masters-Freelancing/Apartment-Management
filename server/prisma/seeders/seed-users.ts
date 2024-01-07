import { INestApplicationContext } from '@nestjs/common';
import { UserService } from '../../src/user/user.service';
import { faker } from '@faker-js/faker/locale/en';
import { RoleEnum } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../src/lib/password';

export interface SeedUsersProps {
  app: INestApplicationContext;
  count: number;
  adminEmail: string;
}

export const seedUsers = async (props: SeedUsersProps) => {
  const { adminEmail, app, count } = props;
  const [userPart] = adminEmail.split('@');

  const userService = app.get(UserService);

  const adminPassword = await hashPassword('admin');

  // Seed admin account
  console.log(`Seeding admin user...`);
  const adminToken = await userService.create({
    address: faker.location.city(),
    contact: faker.phone.number(),
    email: adminEmail,
    name: faker.person.fullName(),
    password: adminPassword,
    role: RoleEnum.ADMIN,
  });
  console.log(
    `Done seeding admin user, created admin token: ${adminToken}, reset your admin password here - http://localhost:3000/reset-password/${adminToken}\n\nNow seeding ${count} tenants...`,
  );

  for (let i = 0; i < count; i++) {
    const email = `${userPart.replace(/\+.+/, '')}+${uuidv4()}@gmail.com`;

    const userPassword = await hashPassword(`${userPart}${i}`);

    await userService.create({
      address: faker.location.city(),
      contact: faker.phone.number(),
      email,
      name: faker.person.fullName(),
      password: userPassword,
      role: RoleEnum.TENANT,
    });
  }

  console.log(`Successfully seeded ${count} tenants`);
};