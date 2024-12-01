import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CustomError from '@/errors';
import { responseObject } from '@/lib';
import { User } from '@/models';
import { Request, IUser } from '@/types';
import { attachCookiesToResponse, createTokenUser } from '@/utils';

/**
 *
 * Register a new user
 *
 * @param req: Request
 * @param res: Response
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, username, name, password } = req.body as IUser;

  const emailAlreadyExists: IUser | null = await User.findOne({
    email,
  });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res
    .status(StatusCodes.CREATED)
    .json(responseObject('User Registered Successfully', { user: tokenUser }));
};

/**
 *
 * Login a user
 *
 * @param req: Request
 * @param res: Response
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body as {
    identifier: string;
    password: string;
  };

  if (!identifier || !password) {
    throw new CustomError.BadRequestError(
      'Please provide identifier and password',
    );
  }
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res
    .status(StatusCodes.OK)
    .json(
      responseObject('User logged in Successfully...', { user: tokenUser }),
    );
};

/**
 *
 * Logout an authenticated user
 *
 * @param req: Request
 * @param res: Response
 * @route POST /api/v1/auth/logout
 * @access Authenticated
 */
export const logout = (req: Request, res: Response): void => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res
    .status(StatusCodes.OK)
    .json(responseObject('User logged out Successfully...'));
};
