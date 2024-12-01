import { NextFunction, Response } from 'express';

import * as CustomError from '@/errors';
import { Request } from '@/types';
import { isTokenValid } from '@/utils';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = (req.signedCookies as { token?: string }).token;

  if (!token) {
    throw new CustomError.UnauthenticatedError(
      'Nice Try! You need to be logged in to access this route...',
    );
  }

  try {
    const user = isTokenValid({ token });
    req.user = user as {
      name: string;
      username: string;
      userId: string;
      role: string;
      iat: number;
      exp: number;
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};
