import { hash, compare } from 'bcrypt';

export const hashPassword = async (plainPassword: string) => {
  const SALTROUND: number | undefined = parseInt(process.env.SALTROUND);

  if (!SALTROUND) return undefined;

  return await hash(plainPassword, SALTROUND);
};

export const comparePassword = async (
  myPlaintextPassword: string,
  hashPassword: string,
) => await compare(myPlaintextPassword, hashPassword);
