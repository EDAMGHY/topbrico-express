import jwt, { JwtPayload } from 'jsonwebtoken';

import { IIsValidToken, IJWTPayload, IAttachCookieRes } from './types';
import { env } from '@/config';

export const createJWT = <T extends string | object | Buffer>({
  payload,
}: IJWTPayload<T>): string => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = ({ token }: IIsValidToken): string | JwtPayload =>
  jwt.verify(token, env.JWT_SECRET);

export const attachCookiesToResponse = ({
  res,
  user,
}: IAttachCookieRes): void => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: env.NODE_ENV === 'production',
    signed: true,
  });
};
