import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async withTransaction<T>(
    fn: (prisma: Prisma.TransactionClient) => Promise<T>,
    transactionClient?: Prisma.TransactionClient,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<T> {
    if (transactionClient) {
      return await fn(transactionClient);
    }

    return await this.$transaction(fn, options);
  }
}
