import { hash } from 'bcrypt';

export const hashPassword = async (plainPassword: string) => {
  const SALTROUND: number | undefined = parseInt(process.env.SALTROUND);

  if (!SALTROUND) return undefined;

  return await hash(plainPassword, SALTROUND);
};
