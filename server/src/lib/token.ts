import { sign, verify } from 'jsonwebtoken';

// For reset password token
export const signData = (payload: any) => {
  const secret = process.env.AUTH_TOKEN_SECRET;

  if (!secret) return undefined;

  return sign(payload, secret, {
    expiresIn: '1d',
  });
};

export const verifyResetPasswordToken = (token: string) => {
  const secret = process.env.AUTH_TOKEN_SECRET;

  if (!secret) return undefined;

  return verify(token, secret);
};
