import { PrismaClient } from '@prisma/client';
import { prompt } from 'enquirer';
import { createStandaloneApplication } from 'src/create-application';
import { seedRooms } from './seeders/seed-rooms';
import { seedUsers } from './seeders/seed-users';
import { seedCategory } from './seeders/seed-category';

const prisma = new PrismaClient();

const questions = [
  {
    type: 'numeral',
    name: 'roomCount',
    message: 'How many rooms do you want to create?',
    round: true,
    initial: 5,
  },
  {
    type: 'numeral',
    name: 'tenantCount',
    message: 'How many tenants do you want to create?',
    round: true,
    initial: 10,
  },
  {
    type: 'input' as const,
    name: 'email',
    message: 'What is your email?',
    default: process.env.ADMIN_EMAIL || undefined,
    async validate(value: string) {
      const exists = await prisma.auth.findUnique({ where: { email: value } });
      if (exists) {
        return 'This email is already used. Please use other email.';
      }
      return true;
    },
  },
];

interface Answers {
  roomCount: number;
  tenantCount: number;
  email: string;
}

async function getAnswers() {
  const answers: Partial<Answers> = await prompt(questions as any);

  return answers as Answers;
}

const main = async () => {
  const app = await createStandaloneApplication({ logger: ['error'] });
  const answers: Answers = await getAnswers();

  await seedCategory({ app });
  // Dili na ni necessary na iparallel query kay need macreate daan ang room before ang user
  await seedRooms({ app, count: answers.roomCount });
  await seedUsers({
    app,
    count: answers.tenantCount,
    adminEmail: answers.email,
  });

  console.log('Creating seed data is successfully done.');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
