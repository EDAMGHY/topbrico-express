import mongoose from 'mongoose';

import { UserPayload } from './types';
import { IUserDocument } from '@/models';

export const createTokenUser = (user: IUserDocument): UserPayload => {
  return {
    name: user.name,
    username: user?.username,
    email: user.email,
    userId: user._id as mongoose.Schema.Types.ObjectId,
  };
};
