import { Response } from 'express';
import mongoose from 'mongoose';

export interface IJWTPayload<T> {
  payload: T;
}

export interface IIsValidToken {
  token: string;
}

export interface UserPayload {
  id?: string;
  userId?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  username: string;
}

export interface IAttachCookieRes {
  res: Response;
  user: UserPayload;
}
