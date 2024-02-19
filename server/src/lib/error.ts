import { ConflictException } from '@nestjs/common';

const PrismaErrorCodes = {
  DUPLICATE: 'P2002',
} as const;

export const catchError = (e: any) => {
  if (e.code === PrismaErrorCodes.DUPLICATE) {
    throw new ConflictException(
      'Room with the same room number is already created.',
    );
  }

  throw e;
};
