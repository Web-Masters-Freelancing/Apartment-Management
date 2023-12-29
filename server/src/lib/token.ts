import { sign } from 'jsonwebtoken';

export const signData = (payload: any) => {
  const secret = process.env.AUTH_TOKEN_SECRET;

  if (!secret) return undefined;

  return sign(payload, secret);
};
