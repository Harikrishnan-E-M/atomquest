import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type AccessTokenPayload = {
  userId: string;
  role: 'employee' | 'manager' | 'admin';
};

export function signAccessToken(payload: AccessTokenPayload) {
  const expiresIn = env.jwtExpiresIn as jwt.SignOptions['expiresIn'];

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn,
  });
}
